import crypto from "crypto";

const KEY_DECRYPT = "12345678901234567890123456789012"; // Client key (utf8 32 byte)
const IV_DECRYPT  = "1234567890123456";                // Client iv (utf8 16 byte)
const SECRET = "uunganteng2831dXVuZ2FudGVuZzI4MzE=";
const KEY_HEX = "0210aeb9924b7c9789b123fad0db342fc967440d65984d9684d85a5b3eb93b6a";
const IV_HEX  = "4d3b7209e627df5a2a72f874fe0b8e3c";

// Decrypt dari client (base64 string -> plain text)
function decryptAES(dataBase64, keyStr, ivStr) {
  const key = Buffer.from(keyStr, "utf8");
  const iv = Buffer.from(ivStr, "utf8");
  const encrypted = Buffer.from(dataBase64, "base64");
  const decipher = crypto.createDecipheriv("aes-256-cbc", key, iv);
  let decrypted = decipher.update(encrypted, undefined, "utf8");
  decrypted += decipher.final("utf8");
  return decrypted;
}

// Encrypt payload pakai hex key/iv (untuk token response)
function aes256cbc(data, keyHex, ivHex) {
  const key = Buffer.from(keyHex, "hex");
  const iv = Buffer.from(ivHex, "hex");
  const cipher = crypto.createCipheriv("aes-256-cbc", key, iv);
  let encrypted = cipher.update(data, "utf8");
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return encrypted;
}

// Generate nonce (32 hex)
function generateNonce() {
  return crypto.randomBytes(16).toString("hex");
}

// ISO timestamp, tanpa ms
function getNowIso() {
  return new Date().toISOString().replace(/\.\d+Z$/, "");
}

export async function POST(request) {
  const raw = await request.text();

  // Parse x-www-form-urlencoded untuk dapetin 'data'
  const params = {};
  for (const pair of raw.split("&")) {
    const [key, val] = pair.split("=");
    params[decodeURIComponent(key)] = decodeURIComponent(val || "");
  }

  if (!params.data) {
    console.log("Missing data param");
    return new Response(null, { status: 204 });
  }

  // 1. DECRYPT DATA POST
  let plain;
  try {
    plain = decryptAES(params.data, KEY_DECRYPT, IV_DECRYPT);
    console.log("Plain from client:", plain);
  } catch (e) {
    console.log("Decrypt failed:", e.message);
    return new Response(null, { status: 204 });
  }

  // 2. PARSE ke OBJECT
  // Dari string: model=SM-A057F&security_patch=2024-08-01&pda=...&android_ver=...
  const dataObj = {};
  for (const pair of plain.split("&")) {
    const [k, v] = pair.split("=");
    if (k && v) dataObj[k] = v;
  }

  // 3. Validasi parameter
  for (const v of ["model", "security_patch", "pda", "android_ver"]) {
    if (!dataObj[v]) {
      console.log("Missing param:", v);
      return new Response(null, { status: 204 });
    }
  }

  // 4. BUILD PAYLOAD (Persis PHP logic, tapi versi JS)
  const timestamp = getNowIso();
  const nonce = generateNonce();
  const payloadArr = [
    "KGPROTOOL",
    nonce,
    timestamp,
    dataObj.model,
    dataObj.security_patch,
    dataObj.pda,
    dataObj.android_ver,
    SECRET
  ];
  const payload = payloadArr.join("|");

  // 5. ENCRYPT & RESPON
  const encrypted = aes256cbc(payload, KEY_HEX, IV_HEX);
  const encryptedHex = encrypted.toString("hex");

  // Log ke server (atau return ke client)
  console.log("==== NEW TOKEN GENERATED ====");
  console.log("Payload :", payload);
  console.log("Hex    :", encryptedHex);
  console.log("=============================");

  // Return ke client (atau bisa kosongin kalau memang hanya buat log)
  return Response.json({ response: encryptedHex });
}
