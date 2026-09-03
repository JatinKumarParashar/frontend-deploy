const pptxgen = require("pptxgenjs");

const pptx = new pptxgen();
pptx.layout = "LAYOUT_WIDE";
pptx.author = "GitHub Copilot";
pptx.subject = "Code and workflow analysis";
pptx.title = "Spotify AI Memory Studio: Code & Workflow Analysis";
pptx.company = "Spotify AI Memory Studio";
pptx.lang = "en-US";
pptx.theme = {
  headFontFace: "Aptos Display",
  bodyFontFace: "Aptos",
  lang: "en-US",
};
pptx.defineSlideMaster({
  title: "MASTER",
  background: { color: "121212" },
  objects: [
    { rect: { x: 0, y: 7.18, w: 13.333, h: 0.32, fill: { color: "1DB954" }, line: { color: "1DB954" } } },
    { text: { text: "AI MEMORY STUDIO  /  CODE & WORKFLOW ANALYSIS", options: { x: 0.55, y: 7.02, w: 6.5, h: 0.16, fontFace: "Aptos", fontSize: 7, color: "777777", margin: 0, breakLine: false } } },
  ],
  slideNumber: { x: 12.55, y: 7.02, color: "777777", fontFace: "Aptos", fontSize: 7 },
});

const C = { bg: "121212", panel: "181818", panel2: "1E1E1E", line: "282828", green: "1DB954", cyan: "00D2FF", white: "FFFFFF", muted: "B3B3B3", red: "FF6666", black: "0D1117" };
const W = 13.333;
function tx(slide, text, x, y, w, h, opts = {}) {
  slide.addText(text, { x, y, w, h, margin: 0, fontFace: opts.fontFace || "Aptos", fontSize: opts.fontSize || 18, color: opts.color || C.white, bold: opts.bold || false, breakLine: false, fit: "shrink", valign: opts.valign || "mid", align: opts.align || "left", italic: opts.italic || false, bullet: opts.bullet, paraSpaceAfterPt: opts.paraSpaceAfterPt || 0 });
}
function rect(slide, x, y, w, h, fill, radius = 0.12, line = fill) {
  slide.addShape(pptx.ShapeType.roundRect, { x, y, w, h, rectRadius: radius, fill: { color: fill }, line: { color: line, width: 1 } });
}
function line(slide, x1, y1, x2, y2, color = C.line, width = 1.5, end = "none") {
  slide.addShape(pptx.ShapeType.line, { x: x1, y: y1, w: x2 - x1, h: y2 - y1, line: { color, width, endArrowType: end } });
}
function title(slide, kicker, heading, sub = "") {
  tx(slide, kicker.toUpperCase(), 0.65, 0.43, 5.8, 0.22, { fontSize: 9, bold: true, color: C.green });
  tx(slide, heading, 0.65, 0.75, 11.9, 0.55, { fontSize: 28, bold: true });
  if (sub) tx(slide, sub, 0.67, 1.38, 11.4, 0.3, { fontSize: 11, color: C.muted });
}
function pill(slide, text, x, y, w, color = C.green) {
  rect(slide, x, y, w, 0.32, color, 0.16, color);
  tx(slide, text, x + 0.1, y + 0.02, w - 0.2, 0.26, { fontSize: 8, bold: true, color: C.bg, align: "center" });
}
function node(slide, label, detail, x, y, w, accent = C.green) {
  rect(slide, x, y, w, 0.88, C.panel, 0.1, C.line);
  slide.addShape(pptx.ShapeType.rect, { x, y, w: 0.08, h: 0.88, fill: { color: accent }, line: { color: accent } });
  tx(slide, label, x + 0.2, y + 0.13, w - 0.3, 0.23, { fontSize: 13, bold: true });
  tx(slide, detail, x + 0.2, y + 0.42, w - 0.3, 0.25, { fontSize: 9, color: C.muted });
}
function bullet(slide, text, x, y, w, accent = C.green) {
  slide.addShape(pptx.ShapeType.ellipse, { x, y: y + 0.08, w: 0.1, h: 0.1, fill: { color: accent }, line: { color: accent } });
  tx(slide, text, x + 0.2, y, w - 0.2, 0.32, { fontSize: 12, color: C.muted });
}

// 1
{
  const s = pptx.addSlide("MASTER");
  tx(s, "SPOTIFY AI", 0.72, 0.75, 2.2, 0.3, { fontSize: 12, bold: true, color: C.green });
  tx(s, "Memory Studio", 0.68, 1.24, 7.2, 0.78, { fontSize: 40, bold: true });
  tx(s, "Code & Workflow Analysis", 0.72, 2.12, 7.2, 0.52, { fontSize: 24, color: C.cyan, bold: true });
  tx(s, "A frontend walkthrough of context-aware audio discovery, persistent memory, and governed personalization.", 0.75, 2.95, 5.7, 0.62, { fontSize: 15, color: C.muted });
  pill(s, "REACT + VITE", 0.75, 4.15, 1.45);
  pill(s, "ROUTER-DRIVEN", 2.35, 4.15, 1.55, C.cyan);
  pill(s, "MEMORY-FIRST UX", 4.05, 4.15, 1.75, C.green);
  rect(s, 8.25, 0.9, 4.25, 4.85, C.panel, 0.18, C.line);
  tx(s, "THE PRODUCT LOOP", 8.65, 1.35, 3.4, 0.22, { fontSize: 10, bold: true, color: C.muted });
  const steps = [["01", "Capture", "profile + OTP"], ["02", "Remember", "fields + graph"], ["03", "Understand", "AI context package"], ["04", "Recommend", "Spotify search"], ["05", "Govern", "pause / export / erase"]];
  steps.forEach((a, i) => { const y = 1.85 + i * 0.68; tx(s, a[0], 8.66, y, 0.32, 0.3, { fontSize: 11, bold: true, color: C.green }); tx(s, a[1], 9.15, y, 1.35, 0.3, { fontSize: 13, bold: true }); tx(s, a[2], 10.65, y, 1.45, 0.3, { fontSize: 10, color: C.muted }); if (i < 4) line(s, 8.82, y + 0.38, 8.82, y + 0.65, C.line, 1); });
  tx(s, "Prepared from the current frontend implementation", 0.75, 6.45, 5.5, 0.2, { fontSize: 9, color: "777777" });
}
// 2
{
  const s = pptx.addSlide("MASTER"); title(s, "01 / Product shape", "What the frontend is building", "A focused studio for turning user context into governed audio discovery.");
  node(s, "Identity", "Login, signup, OTP, role", 0.75, 2.05, 3.75, C.green);
  node(s, "Context", "Memory fields + temporal graph", 4.78, 2.05, 3.75, C.cyan);
  node(s, "Intelligence", "AI DJ response + context package", 8.81, 2.05, 3.75, C.green);
  line(s, 4.5, 2.49, 4.76, 2.49, C.cyan, 2, "triangle"); line(s, 8.53, 2.49, 8.79, 2.49, C.cyan, 2, "triangle");
  node(s, "Discovery", "Recommendations link to Spotify search", 2.75, 3.65, 3.75, C.green);
  node(s, "Governance", "Pause, export JSON, permanent erasure", 6.78, 3.65, 3.75, C.red);
  line(s, 6.6, 4.1, 6.78, 4.1, C.green, 2, "triangle");
  rect(s, 0.75, 5.18, 11.8, 0.86, C.panel2, 0.1, C.line);
  tx(s, "Core promise", 1.0, 5.36, 1.35, 0.25, { fontSize: 12, color: C.green, bold: true });
  tx(s, "The interface makes memory visible, editable, and reversible while keeping the AI interaction lightweight.", 2.55, 5.36, 9.5, 0.25, { fontSize: 13, color: C.white });
}
// 3
{
  const s = pptx.addSlide("MASTER"); title(s, "02 / Runtime architecture", "The app is a protected route shell around shared context", "App.jsx owns access; AppLayout.jsx owns the session surface; pages own focused behavior.");
  rect(s, 0.65, 2.0, 2.25, 3.65, C.panel, 0.12, C.line); tx(s, "BROWSER", 0.92, 2.28, 1.7, 0.22, { fontSize: 10, color: C.green, bold: true });
  ["/login", "/", "/chat", "/memories", "/controls", "/developer"].forEach((v, i) => { pill(s, v, 0.93, 2.75 + i * 0.43, 1.68, i === 0 ? C.cyan : C.green); });
  rect(s, 3.45, 2.0, 2.6, 3.65, C.panel, 0.12, C.line); tx(s, "APP SHELL", 3.75, 2.28, 1.8, 0.22, { fontSize: 10, color: C.cyan, bold: true });
  tx(s, "BrowserRouter", 3.75, 2.85, 1.8, 0.3, { fontSize: 15, bold: true });
  tx(s, "ProtectedRoute", 3.75, 3.38, 1.8, 0.3, { fontSize: 15, bold: true });
  tx(s, "AppLayout", 3.75, 3.91, 1.8, 0.3, { fontSize: 15, bold: true });
  tx(s, "Outlet context", 3.75, 4.44, 1.8, 0.3, { fontSize: 15, bold: true });
  rect(s, 6.65, 2.0, 2.6, 3.65, C.panel, 0.12, C.line); tx(s, "STATE", 6.95, 2.28, 1.8, 0.22, { fontSize: 10, color: C.green, bold: true });
  ["user", "memory", "messages", "context", "refresh()"].forEach((v, i) => { tx(s, v, 6.95, 2.82 + i * 0.47, 1.6, 0.28, { fontSize: 15, color: i === 4 ? C.cyan : C.white, bold: i === 4 }); });
  rect(s, 10.0, 2.0, 2.65, 3.65, C.panel, 0.12, C.line); tx(s, "SERVICE", 10.3, 2.28, 1.8, 0.22, { fontSize: 10, color: C.cyan, bold: true });
  tx(s, "api(path, options)", 10.3, 2.88, 1.9, 0.32, { fontSize: 15, bold: true });
  tx(s, "fetch()", 10.3, 3.55, 1.9, 0.32, { fontSize: 15, bold: true });
  tx(s, "VITE_BACKEND_URL", 10.3, 4.22, 1.9, 0.32, { fontSize: 14, color: C.green, bold: true });
  line(s, 2.92, 3.8, 3.42, 3.8, C.cyan, 2, "triangle"); line(s, 6.08, 3.8, 6.62, 3.8, C.cyan, 2, "triangle"); line(s, 9.28, 3.8, 9.96, 3.8, C.cyan, 2, "triangle");
  tx(s, "Notable implementation choice: shared state is intentionally lifted into AppLayout, so page transitions preserve the active chat and context package.", 0.75, 6.15, 11.8, 0.35, { fontSize: 12, color: C.muted, italic: true });
}
// 4
{
  const s = pptx.addSlide("MASTER"); title(s, "03 / Primary workflow", "From sign-in to a context-aware recommendation", "The happy path crosses six small, explicit state transitions.");
  const steps = [
    ["1", "Authenticate", "POST /auth/login", C.green],
    ["2", "Hydrate memory", "GET /memory/:userId", C.cyan],
    ["3", "Ask the AI DJ", "POST /ai/personalized-chat", C.green],
    ["4", "Receive context", "context_package + response", C.cyan],
    ["5", "Open Spotify", "encoded search URL", C.green],
    ["6", "Refine memory", "POST /memory/update-field", C.cyan],
  ];
  steps.forEach((a, i) => { const x = 0.8 + (i % 3) * 4.18; const y = 2.0 + Math.floor(i / 3) * 1.75; rect(s, x, y, 3.55, 1.18, C.panel, 0.12, C.line); tx(s, a[0], x + 0.22, y + 0.2, 0.35, 0.36, { fontSize: 20, bold: true, color: a[3] }); tx(s, a[1], x + 0.78, y + 0.18, 2.45, 0.25, { fontSize: 14, bold: true }); tx(s, a[2], x + 0.78, y + 0.58, 2.45, 0.28, { fontSize: 10, color: C.muted }); if (i < 2) line(s, x + 3.6, y + 0.58, x + 4.05, y + 0.58, C.cyan, 1.5, "triangle"); });
  line(s, 10.8, 3.18, 10.8, 3.48, C.cyan, 1.5, "triangle");
  rect(s, 0.8, 5.62, 11.9, 0.62, C.green, 0.1, C.green); tx(s, "User-visible result: recommendations reflect current mood, activity, artist, podcast interest, and exclusions.", 1.1, 5.79, 11.3, 0.24, { fontSize: 13, bold: true, color: C.bg, align: "center" });
}
// 5
{
  const s = pptx.addSlide("MASTER"); title(s, "04 / Feature surfaces", "Each page has a single job", "Navigation stays persistent so the user can move between discovery and governance without losing context.");
  const cards = [
    ["HOME", "Active context", "Shows current memory signals and quick recommendation entry points.", C.green],
    ["AI ASSISTANT", "Conversation", "Prompt chips or free text produce an AI DJ response and context package.", C.cyan],
    ["MY MEMORIES", "Edit + inspect", "Updates five fields and displays active graph triples with confidence/provenance.", C.green],
    ["RECOMMENDATIONS", "Browse", "Builds song, playlist, and podcast queries from memory values.", C.cyan],
    ["MEMORY CONTROLS", "Govern", "Pause personalization, export JSON, or purge stored memories.", C.red],
    ["DEVELOPER", "Observe", "Role-gated metrics and the latest bounded context package.", C.green],
  ];
  cards.forEach((a, i) => { const x = 0.75 + (i % 3) * 4.18; const y = 1.95 + Math.floor(i / 3) * 1.75; rect(s, x, y, 3.62, 1.32, C.panel, 0.1, C.line); pill(s, a[0], x + 0.22, y + 0.18, 1.18, a[3]); tx(s, a[1], x + 0.22, y + 0.65, 3.0, 0.25, { fontSize: 14, bold: true }); tx(s, a[2], x + 0.22, y + 0.96, 3.05, 0.27, { fontSize: 9, color: C.muted }); });
}
// 6
{
  const s = pptx.addSlide("MASTER"); title(s, "05 / Data flow", "Memory is both a product feature and a shared state contract", "The frontend keeps the current memory snapshot in AppLayout and refreshes it after mutations.");
  node(s, "Backend memory API", "GET /memory/:id", 0.78, 2.08, 3.0, C.cyan);
  node(s, "AppLayout", "memory + refresh()", 5.15, 2.08, 3.0, C.green);
  node(s, "Pages", "Home / Memories / Controls", 9.52, 2.08, 3.0, C.cyan);
  line(s, 3.82, 2.52, 5.1, 2.52, C.cyan, 2, "triangle"); line(s, 8.2, 2.52, 9.47, 2.52, C.green, 2, "triangle");
  node(s, "User edits field", "value or null", 1.4, 4.0, 3.0, C.green);
  node(s, "POST update-field", "then refresh()", 5.15, 4.0, 3.0, C.cyan);
  node(s, "Visible everywhere", "new context on next render", 8.9, 4.0, 3.0, C.green);
  line(s, 4.45, 4.44, 5.1, 4.44, C.green, 2, "triangle"); line(s, 8.2, 4.44, 8.85, 4.44, C.cyan, 2, "triangle");
  rect(s, 0.8, 5.72, 11.85, 0.55, C.panel2, 0.1, C.line); tx(s, "API wrapper behavior: JSON headers are added centrally; non-2xx responses become thrown errors for page-level handling.", 1.05, 5.88, 11.3, 0.2, { fontSize: 11, color: C.muted, align: "center" });
}
// 7
{
  const s = pptx.addSlide("MASTER"); title(s, "06 / Privacy + role model", "Governance is built into the visible workflow", "The UI exposes control rather than treating memory as an invisible backend concern.");
  rect(s, 0.78, 2.0, 5.65, 3.65, C.panel, 0.12, C.line); tx(s, "USER CONTROLS", 1.12, 2.32, 2.0, 0.22, { fontSize: 10, color: C.green, bold: true });
  bullet(s, "Pause memory for an incognito session", 1.12, 2.85, 4.7); bullet(s, "Toggle governed personalization", 1.12, 3.4, 4.7); bullet(s, "Download stored data as JSON", 1.12, 3.95, 4.7); bullet(s, "Permanently delete all memories", 1.12, 4.5, 4.7, C.red);
  rect(s, 6.9, 2.0, 5.65, 3.65, C.panel, 0.12, C.line); tx(s, "ACCESS MODEL", 7.24, 2.32, 2.0, 0.22, { fontSize: 10, color: C.cyan, bold: true });
  pill(s, "NORMAL USER", 7.24, 2.85, 1.45, C.green); tx(s, "Core pages: home, chat, memories, recommendations, controls", 8.92, 2.87, 3.0, 0.28, { fontSize: 10, color: C.muted });
  pill(s, "DEVELOPER", 7.24, 3.65, 1.25, C.cyan); tx(s, "Adds /developer and exposes bounded context telemetry", 8.72, 3.67, 3.2, 0.28, { fontSize: 10, color: C.muted });
  tx(s, "Implementation note", 7.24, 4.55, 1.55, 0.22, { fontSize: 11, color: C.green, bold: true });
  tx(s, "Logout clears localStorage and routes back to /login.", 8.92, 4.55, 3.1, 0.22, { fontSize: 10, color: C.muted });
}
// 8
{
  const s = pptx.addSlide("MASTER"); title(s, "07 / Engineering readout", "What is strong, and what to harden next", "The current frontend has a clean demo flow; the next gains are mostly resilience and production readiness.");
  rect(s, 0.78, 2.0, 5.6, 3.9, C.panel, 0.12, C.line); tx(s, "ALREADY WORKING WELL", 1.12, 2.32, 3.0, 0.22, { fontSize: 10, color: C.green, bold: true });
  bullet(s, "Clear route-level separation of concerns", 1.12, 2.88, 4.7); bullet(s, "Shared context preserves the conversational session", 1.12, 3.43, 4.7); bullet(s, "Memory edits immediately refresh the shell", 1.12, 3.98, 4.7); bullet(s, "Privacy actions are discoverable and concrete", 1.12, 4.53, 4.7);
  rect(s, 6.95, 2.0, 5.6, 3.9, C.panel, 0.12, C.line); tx(s, "NEXT HARDENING MOVES", 7.29, 2.32, 3.0, 0.22, { fontSize: 10, color: C.cyan, bold: true });
  bullet(s, "Add loading, retry, and empty/error states around API calls", 7.29, 2.88, 4.7, C.cyan); bullet(s, "Avoid logging demo OTP/backend details in production", 7.29, 3.43, 4.7, C.red); bullet(s, "Validate JSON/API availability before parsing response", 7.29, 3.98, 4.7, C.cyan); bullet(s, "Add focused tests for auth, refresh, purge, and role gating", 7.29, 4.53, 4.7, C.cyan);
  tx(s, "Bottom line: the frontend already communicates the product thesis clearly: personalization should be useful, inspectable, and under the user’s control.", 0.85, 6.25, 11.8, 0.34, { fontSize: 13, color: C.white, bold: true, align: "center" });
}

// 9
{
  const s = pptx.addSlide("MASTER"); title(s, "08 / User workflow", "One continuous loop from identity to control", "The workflow combines explicit user intent with memory-backed personalization.");
  const flow = [
    ["SIGN IN", "Existing user\nrole selected", C.green],
    ["LOAD", "Memory snapshot\nhydrated", C.cyan],
    ["ASK", "Prompt chip or\nfree-text query", C.green],
    ["RESPOND", "AI DJ response\n+ context package", C.cyan],
    ["PLAY", "Spotify search\nopens externally", C.green],
    ["REFINE", "Edit, pause,\nexport, or erase", C.red],
  ];
  flow.forEach((a, i) => {
    const x = 0.68 + i * 2.1;
    rect(s, x, 2.35, 1.72, 1.55, C.panel, 0.12, C.line);
    pill(s, a[0], x + 0.18, 2.58, 1.36, a[2]);
    tx(s, a[1], x + 0.18, 3.12, 1.36, 0.5, { fontSize: 11, color: C.muted, align: "center" });
    if (i < flow.length - 1) line(s, x + 1.75, 3.12, x + 2.03, 3.12, C.cyan, 1.5, "triangle");
  });
  rect(s, 1.0, 4.75, 11.25, 0.92, C.panel2, 0.1, C.line);
  tx(s, "State that persists across pages", 1.35, 4.98, 2.55, 0.24, { fontSize: 12, color: C.green, bold: true });
  tx(s, "user  ·  memory  ·  messages  ·  context", 4.15, 4.98, 4.45, 0.24, { fontSize: 14, color: C.white, bold: true });
  tx(s, "AppLayout passes these values through Outlet context.", 8.45, 4.98, 3.25, 0.24, { fontSize: 10, color: C.muted });
  tx(s, "Key behavior: a recommendation is not a dead end; it feeds a repeatable loop where the user can update the memory that shaped it.", 1.0, 6.15, 11.25, 0.3, { fontSize: 12, color: C.muted, italic: true, align: "center" });
}

// 10
{
  const s = pptx.addSlide("MASTER"); title(s, "09 / Code organization", "The folder structure follows the product workflow", "Small route-level pages sit on top of reusable UI, layout, and service layers.");
  rect(s, 0.75, 1.95, 5.1, 4.35, C.black, 0.12, C.line);
  tx(s, "frontend/", 1.08, 2.25, 2.1, 0.28, { fontSize: 17, bold: true, color: C.green });
  const tree = [
    ["index.html", 0, C.muted], ["package.json", 0, C.muted], ["vite.config.js", 0, C.muted],
    ["src/", 0, C.cyan], ["  App.jsx", 1, C.white], ["  main.jsx", 1, C.white],
    ["  components/", 1, C.cyan], ["    AuthScreen.jsx", 2, C.muted], ["    ui.jsx", 2, C.muted],
    ["  layouts/", 1, C.cyan], ["    AppLayout.jsx", 2, C.muted],
    ["  pages/", 1, C.cyan], ["    HomePage.jsx ...", 2, C.muted], ["    ChatPage.jsx ...", 2, C.muted],
    ["  services/", 1, C.cyan], ["    api.js", 2, C.muted],
  ];
  tree.forEach((a, i) => tx(s, a[0], 1.08 + a[1] * 0.28, 2.72 + i * 0.2, 3.8, 0.18, { fontSize: 9, color: a[2], bold: a[0].endsWith("/") || a[0] === "frontend/" }));
  const layers = [
    ["App.jsx", "Routing + auth gate", C.green],
    ["layouts/", "Shared session state", C.cyan],
    ["pages/", "Feature workflows", C.green],
    ["components/", "Reusable UI + auth", C.cyan],
    ["services/", "Backend API wrapper", C.green],
  ];
  layers.forEach((a, i) => {
    const y = 2.08 + i * 0.78;
    node(s, a[0], a[1], 6.55, y, 4.75, a[2]);
    if (i < layers.length - 1) line(s, 8.92, y + 0.9, 8.92, y + 0.75, C.line, 1.2, "triangle");
  });
  tx(s, "Design readout: ownership is easy to locate. Route decisions live in App.jsx, session-wide data in AppLayout, and endpoint calls close to the page action that needs them.", 6.58, 6.15, 5.6, 0.38, { fontSize: 11, color: C.muted, italic: true });
}

// 11
{
  const s = pptx.addSlide("MASTER");
  tx(s, "THANK YOU", 0.75, 1.25, 4.5, 0.35, { fontSize: 13, bold: true, color: C.green });
  tx(s, "Spotify AI Memory Studio", 0.72, 1.95, 8.7, 0.82, { fontSize: 38, bold: true });
  tx(s, "Useful personalization. Visible memory. User control.", 0.76, 2.95, 8.2, 0.42, { fontSize: 22, color: C.cyan, bold: true });
  rect(s, 0.78, 4.15, 6.5, 0.92, C.panel, 0.12, C.line);
  tx(s, "Code analyzed", 1.08, 4.38, 1.45, 0.22, { fontSize: 11, color: C.muted });
  tx(s, "React + Vite frontend", 2.72, 4.38, 2.1, 0.22, { fontSize: 14, bold: true });
  tx(s, "11 slides", 5.45, 4.38, 1.1, 0.22, { fontSize: 14, color: C.green, bold: true });
  rect(s, 9.35, 1.0, 2.85, 4.75, C.panel, 0.18, C.line);
  tx(s, "THE LOOP", 9.75, 1.5, 2.0, 0.22, { fontSize: 10, color: C.muted, bold: true, align: "center" });
  ["remember", "understand", "recommend", "govern"].forEach((v, i) => { const y = 2.08 + i * 0.72; pill(s, v.toUpperCase(), 9.78, y, 1.98, i === 3 ? C.red : (i % 2 ? C.cyan : C.green)); });
  tx(s, "End of analysis", 0.78, 6.18, 5.2, 0.25, { fontSize: 12, color: C.muted, italic: true });
}

pptx.writeFile({ fileName: "docs/spotify-ai-memory-studio-analysis.pptx" });
