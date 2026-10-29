import fs from "fs";
import os from "os";
import path from "path";
import { DatabaseSync } from "node:sqlite";
import { articles, doors, properties, sampleEnquiries } from "./content";
import type { Article, Door, Enquiry, Property } from "./types";

const globalForDb = globalThis as unknown as { airbanDb?: DatabaseSync };

/**
 * Uses ./data locally. Serverless hosts (e.g. Vercel) have a read-only project folder,
 * so fall back to the temp directory there; the demo data re-seeds on each cold start.
 */
function databaseFile() {
  const candidates = [process.env.AIRBAN_DATA_DIR, path.join(process.cwd(), "data"), path.join(os.tmpdir(), "airban")];
  for (const dir of candidates) {
    if (!dir) continue;
    try {
      fs.mkdirSync(dir, { recursive: true });
      fs.accessSync(dir, fs.constants.W_OK);
      return path.join(dir, "airban.db");
    } catch {}
  }
  return ":memory:";
}

function connect() {
  if (globalForDb.airbanDb) return globalForDb.airbanDb;
  const db = new DatabaseSync(databaseFile());
  db.exec(`
    PRAGMA journal_mode = WAL;
    CREATE TABLE IF NOT EXISTS properties (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      address TEXT NOT NULL,
      location TEXT NOT NULL,
      price TEXT NOT NULL,
      period TEXT NOT NULL,
      bedrooms TEXT NOT NULL,
      beds INTEGER NOT NULL,
      baths INTEGER NOT NULL,
      area TEXT NOT NULL,
      description TEXT NOT NULL,
      features TEXT NOT NULL,
      image TEXT NOT NULL,
      images TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT 'listed'
    );
    CREATE TABLE IF NOT EXISTS doors (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      price TEXT NOT NULL,
      type TEXT NOT NULL,
      image TEXT NOT NULL,
      description TEXT NOT NULL,
      stock INTEGER NOT NULL DEFAULT 1
    );
    CREATE TABLE IF NOT EXISTS enquiries (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      first_name TEXT NOT NULL,
      last_name TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT NOT NULL,
      enquiry_type TEXT NOT NULL,
      additional_info TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT 'pending',
      created_at TEXT NOT NULL
    );
    CREATE TABLE IF NOT EXISTS articles (
      slug TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      excerpt TEXT NOT NULL,
      published_on TEXT NOT NULL,
      body TEXT NOT NULL
    );
  `);
  seed(db);
  migrate(db);
  db.exec(`UPDATE properties SET area = '...' WHERE area = 'Available on request'`);
  globalForDb.airbanDb = db;
  return db;
}

function insertCatalogue(db: DatabaseSync) {
  const insertProperty = db.prepare(`
    INSERT OR IGNORE INTO properties
      (id, title, address, location, price, period, bedrooms, beds, baths, area, description, features, image, images, status)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);
  for (const item of properties) {
    insertProperty.run(
      item.id,
      item.title,
      item.address,
      item.location,
      item.price,
      item.period,
      item.bedrooms,
      item.beds,
      item.baths,
      item.area,
      item.description,
      JSON.stringify(item.features),
      item.image,
      JSON.stringify(item.images),
      item.status,
    );
  }

  const insertDoor = db.prepare(`
    INSERT OR IGNORE INTO doors (id, name, price, type, image, description, stock)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `);
  for (const item of doors) {
    insertDoor.run(item.id, item.name, item.price, item.type, item.image, item.description, item.stock);
  }
}

/**
 * Brings databases seeded by an earlier version up to date with the current catalogue.
 * Only adds missing items and replaces values that still match the old seed, so staff edits are kept.
 */
function migrate(db: DatabaseSync) {
  const version = Number(db.prepare("PRAGMA user_version").get()?.user_version ?? 0);
  if (version < 2) {
    insertCatalogue(db);
    const update = db.prepare("UPDATE doors SET price = ? WHERE id = ? AND price = ?");
    update.run("GHS 13200.00", "699fc25d-4319-49d2-b227-0166636c3b23", "GHS 250.00");
    update.run("GHS 1450.00", "9d291fa2-7cb0-459b-920d-5146b3b3ee53", "GHS 950.00");
    update.run("GHS 7450.00", "ae5fe099-7625-4289-bef7-5863c23b879c", "GHS 349.99");
    const internal = doors.find((door) => door.id === "9d291fa2-7cb0-459b-920d-5146b3b3ee53");
    if (internal) {
      db.prepare("UPDATE doors SET image = ?, description = ? WHERE id = ? AND image = '/img/internal-door.jpg'").run(
        internal.image,
        internal.description,
        internal.id,
      );
    }
    db.exec("PRAGMA user_version = 2");
  }
}

function seed(db: DatabaseSync) {
  const propertyCount = db.prepare("SELECT COUNT(*) AS n FROM properties").get();
  if (Number(propertyCount?.n) > 0) return;

  insertCatalogue(db);

  const insertEnquiry = db.prepare(`
    INSERT INTO enquiries
      (first_name, last_name, email, phone, enquiry_type, additional_info, status, created_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `);
  for (const item of sampleEnquiries) {
    insertEnquiry.run(
      item.firstName,
      item.lastName,
      item.email,
      item.phone,
      item.enquiryType,
      item.additionalInfo,
      item.status,
      item.createdAt,
    );
  }

  const insertArticle = db.prepare(`
    INSERT INTO articles (slug, title, excerpt, published_on, body)
    VALUES (?, ?, ?, ?, ?)
  `);
  for (const item of articles) {
    insertArticle.run(item.slug, item.title, item.excerpt, item.publishedOn, item.body);
  }
}

function asProperty(row: Record<string, unknown>): Property {
  return {
    id: String(row.id),
    title: String(row.title),
    address: String(row.address),
    location: String(row.location),
    price: String(row.price),
    period: String(row.period),
    bedrooms: String(row.bedrooms),
    beds: Number(row.beds),
    baths: Number(row.baths),
    area: String(row.area),
    description: String(row.description),
    features: JSON.parse(String(row.features)) as string[],
    image: String(row.image),
    images: JSON.parse(String(row.images)) as string[],
    status: row.status === "previous" ? "previous" : "listed",
  };
}

function asDoor(row: Record<string, unknown>): Door {
  return {
    id: String(row.id),
    name: String(row.name),
    price: String(row.price),
    type: String(row.type),
    image: String(row.image),
    description: String(row.description),
    stock: Number(row.stock),
  };
}

function asEnquiry(row: Record<string, unknown>): Enquiry {
  return {
    id: Number(row.id),
    firstName: String(row.first_name),
    lastName: String(row.last_name),
    email: String(row.email),
    phone: String(row.phone),
    enquiryType: String(row.enquiry_type),
    additionalInfo: String(row.additional_info),
    status: row.status === "resolved" ? "resolved" : "pending",
    createdAt: String(row.created_at),
  };
}

function asArticle(row: Record<string, unknown>): Article {
  return {
    slug: String(row.slug),
    title: String(row.title),
    excerpt: String(row.excerpt),
    publishedOn: String(row.published_on),
    body: String(row.body),
  };
}

export function listProperties(status?: Property["status"]) {
  const db = connect();
  const rows = status
    ? db.prepare("SELECT * FROM properties WHERE status = ? ORDER BY CAST(id AS INTEGER), id").all(status)
    : db.prepare("SELECT * FROM properties ORDER BY CAST(id AS INTEGER), id").all();
  return rows.map(asProperty);
}

export function getProperty(id: string) {
  const row = connect().prepare("SELECT * FROM properties WHERE id = ?").get(id);
  return row ? asProperty(row) : null;
}

export function saveProperty(input: Property) {
  const id = input.id || crypto.randomUUID();
  const images = input.images.length > 0 ? input.images : [input.image].filter(Boolean);
  const image = images[0] || "/img/hero-house.png";
  connect()
    .prepare(
      `INSERT INTO properties
        (id, title, address, location, price, period, bedrooms, beds, baths, area, description, features, image, images, status)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
       ON CONFLICT(id) DO UPDATE SET
        title = excluded.title,
        address = excluded.address,
        location = excluded.location,
        price = excluded.price,
        period = excluded.period,
        bedrooms = excluded.bedrooms,
        beds = excluded.beds,
        baths = excluded.baths,
        area = excluded.area,
        description = excluded.description,
        features = excluded.features,
        image = excluded.image,
        images = excluded.images,
        status = excluded.status`,
    )
    .run(
      id,
      input.title,
      input.address,
      input.location,
      input.price,
      input.period,
      input.bedrooms,
      input.beds,
      input.baths,
      input.area,
      input.description,
      JSON.stringify(input.features),
      image,
      JSON.stringify(images.length ? images : [image]),
      input.status,
    );
  return id;
}

export function deleteProperty(id: string) {
  connect().prepare("DELETE FROM properties WHERE id = ?").run(id);
}

export function listDoors() {
  return connect()
    .prepare("SELECT * FROM doors ORDER BY stock = 0, name")
    .all()
    .map(asDoor);
}

export function getDoor(id: string) {
  const row = connect().prepare("SELECT * FROM doors WHERE id = ?").get(id);
  return row ? asDoor(row) : null;
}

export function saveDoor(input: Door) {
  const id = input.id || crypto.randomUUID();
  connect()
    .prepare(
      `INSERT INTO doors (id, name, price, type, image, description, stock)
       VALUES (?, ?, ?, ?, ?, ?, ?)
       ON CONFLICT(id) DO UPDATE SET
        name = excluded.name,
        price = excluded.price,
        type = excluded.type,
        image = excluded.image,
        description = excluded.description,
        stock = excluded.stock`,
    )
    .run(id, input.name, input.price, input.type, input.image, input.description, input.stock);
  return id;
}

export function deleteDoor(id: string) {
  connect().prepare("DELETE FROM doors WHERE id = ?").run(id);
}

export function listEnquiries() {
  return connect()
    .prepare("SELECT * FROM enquiries ORDER BY id DESC")
    .all()
    .map(asEnquiry);
}

export function createEnquiry(input: Omit<Enquiry, "id" | "status" | "createdAt"> & { status?: Enquiry["status"] }) {
  connect()
    .prepare(
      `INSERT INTO enquiries
        (first_name, last_name, email, phone, enquiry_type, additional_info, status, created_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    )
    .run(
      input.firstName,
      input.lastName,
      input.email,
      input.phone,
      input.enquiryType,
      input.additionalInfo,
      input.status ?? "pending",
      new Date().toISOString(),
    );
}

export function setEnquiryStatus(id: number, status: Enquiry["status"]) {
  connect().prepare("UPDATE enquiries SET status = ? WHERE id = ?").run(status, id);
}

export function listArticles() {
  return connect()
    .prepare("SELECT slug, title, excerpt, published_on, body FROM articles ORDER BY published_on DESC")
    .all()
    .map(asArticle);
}

export function getArticle(slug: string) {
  const row = connect().prepare("SELECT * FROM articles WHERE slug = ?").get(slug);
  return row ? asArticle(row) : null;
}

export function counts() {
  const db = connect();
  const properties = Number(db.prepare("SELECT COUNT(*) AS n FROM properties WHERE status = 'listed'").get()?.n ?? 0);
  const doors = Number(db.prepare("SELECT COUNT(*) AS n FROM doors").get()?.n ?? 0);
  const pending = Number(db.prepare("SELECT COUNT(*) AS n FROM enquiries WHERE status = 'pending'").get()?.n ?? 0);
  return { properties, doors, pending };
}
