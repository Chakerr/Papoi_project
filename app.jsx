const { useState, useEffect, useRef, useMemo, useCallback } = React;

/* ─── BRAND ASSETS ─────────────────────────────────────── */
const logo_principal = "assets/Reciclaje.svg";
const icono_inicio = "assets/casa.png";
const icono_mapa = "assets/mapas-y-banderas.png";
const icono_historial = "assets/carreteras.png";
const icono_perfil = "assets/usuario.png";
const icono_candado = "assets/candado-abierto.png";
const icono_transportista = "assets/autobus.png";
const svg_camion = "assets/CamionReciclaje.svg";
const icono_ganancias = "assets/hucha.png";
const icono_rutas = "assets/compartimiento.png";
/* ─── PALETTE ──────────────────────────────────────────── */
const P = {
  dark: '#254336', sage: '#6B8A7A', tan: '#B7B597', cream: '#DAD3BE',
  bg: '#F5F5F5', card: '#FFFFFF', white: '#FFFFFF',
  green: '#4CAF50', blue: '#2196F3', red: '#F44336', orange: '#FF9800',
  crit: '#F44336', warn: '#FF9800', ok: '#4CAF50',
  text: '#1A1A1A', textSub: '#757575',
  border: 'rgba(0,0,0,.08)',
  shadow: '0 2px 12px rgba(0,0,0,.08)',
  shadowMd: '0 4px 20px rgba(0,0,0,.12)',
  shadowLg: '0 8px 32px rgba(0,0,0,.16)',
};

/* ─── DATA ─────────────────────────────────────────────── */
const CONTAINERS = [
  { id: 'c01', lat: 4.629, lng: -74.157, fill: 88, rec: true, type: 'Mixto', addr: 'Cl 38 Sur #82-45', loc: 'Kennedy' },
  { id: 'c02', lat: 4.622, lng: -74.148, fill: 95, rec: false, type: 'Residuos', addr: 'Kr 80 #40 Sur-22', loc: 'Kennedy' },
  { id: 'c03', lat: 4.635, lng: -74.162, fill: 72, rec: true, type: 'Cartón', addr: 'Av Boyacá #37 Sur', loc: 'Kennedy' },
  { id: 'c04', lat: 4.758, lng: -74.096, fill: 65, rec: true, type: 'Plástico', addr: 'Kr 91 #145-30', loc: 'Suba' },
  { id: 'c05', lat: 4.764, lng: -74.075, fill: 48, rec: false, type: 'Residuos', addr: 'Cl 147 #103-15', loc: 'Suba' },
  { id: 'c06', lat: 4.750, lng: -74.086, fill: 82, rec: true, type: 'Mixto', addr: 'Av Suba #112-55', loc: 'Suba' },
  { id: 'c07', lat: 4.518, lng: -74.158, fill: 91, rec: true, type: 'Cartón', addr: 'Kr 19 #67 Sur-40', loc: 'Ciudad Bolívar' },
  { id: 'c08', lat: 4.525, lng: -74.145, fill: 75, rec: false, type: 'Residuos', addr: 'Tv 40 #74 Sur-8', loc: 'Ciudad Bolívar' },
  { id: 'c09', lat: 4.512, lng: -74.138, fill: 68, rec: true, type: 'Plástico', addr: 'Cl 69 Sur #52-12', loc: 'Ciudad Bolívar' },
  { id: 'c10', lat: 4.712, lng: -74.118, fill: 58, rec: true, type: 'Vidrio', addr: 'Cl 80 #112-25', loc: 'Engativá' },
  { id: 'c11', lat: 4.718, lng: -74.108, fill: 78, rec: false, type: 'Residuos', addr: 'Av Rojas #75-30', loc: 'Engativá' },
  { id: 'c12', lat: 4.608, lng: -74.183, fill: 85, rec: true, type: 'Mixto', addr: 'Cl 59 Sur #78E-20', loc: 'Bosa' },
  { id: 'c14', lat: 4.652, lng: -74.046, fill: 61, rec: true, type: 'Metal', addr: 'Av Chile #13-25', loc: 'Chapinero' },
  { id: 'c15', lat: 4.598, lng: -74.066, fill: 73, rec: true, type: 'Cartón', addr: 'Cl 6 #9-55', loc: 'Santa Fe' },
  { id: 'c18', lat: 4.572, lng: -74.075, fill: 79, rec: true, type: 'Plástico', addr: 'Kr 5E #36 Sur-10', loc: 'San Cristóbal' },
  { id: 'c20', lat: 4.625, lng: -74.110, fill: 51, rec: true, type: 'Metal', addr: 'Kr 36 #6-55', loc: 'Puente Aranda' },
  { id: 'c21', lat: 4.568, lng: -74.126, fill: 63, rec: true, type: 'Cartón', addr: 'Av Cda de Quito #54S', loc: 'Tunjuelito' },
  { id: 'c22', lat: 4.552, lng: -74.102, fill: 77, rec: true, type: 'Mixto', addr: 'Cl 22 Sur #27-35', loc: 'Rafael Uribe' },
];
const ROUTE_IDS = ['c01', 'c03', 'c12', 'c07', 'c08', 'c09'];

const ROUTES_BY_TR = {
  'TR-01': ['c01', 'c03', 'c12', 'c07', 'c08', 'c09'],
  'TR-02': ['c04', 'c05', 'c06', 'c10', 'c11'],
  'TR-03': ['c14', 'c15', 'c18', 'c20', 'c21'],
  'TR-04': ['c22', 'c09', 'c08', 'c20', 'c14'],
};

const TRANSPORT_ROUTES = [
  { id: 'TR-01', zone: 'Sur', stops: 8, kg: 4820, status: 'en curso', driver: 'Miguel Torres', pct: 62 },
  { id: 'TR-02', zone: 'Norte', stops: 6, kg: 3150, status: 'pendiente', driver: 'Laura Gómez', pct: 0 },
  { id: 'TR-03', zone: 'Occidente', stops: 5, kg: 2780, status: 'completada', driver: 'Héctor Ruiz', pct: 100 },
  { id: 'TR-04', zone: 'Centro', stops: 7, kg: 3640, status: 'en curso', driver: 'Ana Martínez', pct: 41 },
];
const VEHICLES = [
  { id: 'CAM-001', plate: 'TKB-924', cap: 8000, load: 4820, status: 'activo', fuel: 72 },
  { id: 'CAM-002', plate: 'SJR-501', cap: 8000, load: 0, status: 'base', fuel: 100 },
  { id: 'CAM-003', plate: 'MPL-347', cap: 6000, load: 3640, status: 'activo', fuel: 48 },
  { id: 'CAM-004', plate: 'ZQW-188', cap: 6000, load: 2780, status: 'mant.', fuel: 15 },
];

/* ─── HELPERS ──────────────────────────────────────────── */
function mCol(fill, rec) {
  if (rec && fill >= 55) return P.green;
  if (fill >= 85) return P.crit;
  if (fill >= 65) return P.warn;
  return '#9E9E9E';
}
function mkIcon(c, idx, isActive) {
  const col = mCol(c.fill, c.rec);
  const s = isActive ? 28 : 20;
  const shape = c.rec ? '50%' : '6px';
  const label = idx != null
    ? `<span style="font-size:${s * .38}px;font-weight:700;color:white;font-family:Poppins,sans-serif">${idx}</span>`
    : c.rec
      ? `<img src="assets/reciclar.png" style="width:${s * .6}px;height:${s * .6}px;object-fit:contain;"/>`
      : `<img src="assets/compartimiento.png" style="width:${s * .6}px;height:${s * .6}px;object-fit:contain;"/>`;
  return L.divIcon({
    html: `<div style="width:${s}px;height:${s}px;border-radius:${shape};background:${idx != null ? col : 'white'};
      border:${isActive ? 3 : 2}px solid ${col};
      box-shadow:0 2px 8px rgba(0,0,0,.35)${isActive ? `,0 0 0 6px ${col}33` : ''}; 
      display:flex;align-items:center;justify-content:center;">${label}</div>`,
    className: '', iconSize: [s, s], iconAnchor: [s / 2, s / 2]
  });
}

function Card({ children, style = {}, onClick }) {
  return <div onClick={onClick} style={{ background: P.card, borderRadius: 20, boxShadow: P.shadow, padding: '16px 18px', cursor: onClick ? 'pointer' : 'default', ...style }}>{children}</div>;
}
function Chip({ label, color = P.green }) {
  return <span style={{ fontSize: 10, fontWeight: 600, padding: '3px 9px', borderRadius: 20, background: color + '22', color: color, display: 'inline-block' }}>{label}</span>;
}
function FillBar({ val, h = 6 }) {
  const col = val >= 85 ? P.crit : val >= 65 ? P.warn : P.green;
  return <div style={{ height: h, background: '#EBEBEB', borderRadius: h / 2, overflow: 'hidden' }}><div style={{ height: '100%', width: `${val}%`, background: col, borderRadius: h / 2, transition: 'width .4s' }} /></div>;
}
function Spinner() {
  return <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 1 }}>
    <div className="spinner-ring" style={{ width: 32, height: 32, borderRadius: '50%', border: `3px solid #E0E0E0`, borderTopColor: P.dark }} />
  </div>;
}
function SectionHeader({ title, sub, onBack, right }) {
  return <div style={{
    background: P.dark, padding: '14px 18px 16px', flexShrink: 0,
    display: 'flex', alignItems: 'center', gap: 10
  }}>
    {onBack && <button onClick={onBack} style={{ background: 'rgba(255,255,255,.12)', border: 'none', borderRadius: 12, width: 34, height: 34, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0, color: 'white', fontSize: 18 }}>←</button>}
    <div style={{ flex: 1 }}>
      <div style={{ fontSize: 17, fontWeight: 700, color: 'white' }}>{title}</div>
      {sub && <div style={{ fontSize: 11, color: 'rgba(255,255,255,.55)', marginTop: 1 }}>{sub}</div>}
    </div>
    {right}
  </div>;
}
function StatCard({ icon, label, value, color = P.dark, small = false }) {
  return <Card style={{ flex: 1, minWidth: 0 }}>
    <div style={{ fontSize: small ? 18 : 24, marginBottom: 4 }}>{icon}</div>
    <div style={{ fontSize: small ? 18 : 22, fontWeight: 700, color: P.text, lineHeight: 1 }}>{value}</div>
    <div style={{ fontSize: 10, color: P.textSub, marginTop: 3, fontWeight: 500 }}>{label}</div>
  </Card>;
}

/* ─── LEAFLET MAP ──────────────────────────────────────── */
function MapView({ conts = [], routeIds = [], selId, onContClick, center = [4.65, -74.09], zoom = 12 }) {
  const divRef = useRef(null), mapRef = useRef(null), mksRef = useRef({}), routeRef = useRef(null), clickRef = useRef(onContClick);
  const [loading, setLoading] = useState(true);
  useEffect(() => { clickRef.current = onContClick; });

  useEffect(() => {
    if (!divRef.current || mapRef.current) return;
    const m = L.map(divRef.current, { center, zoom, zoomControl: false });
    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', { maxZoom: 19 })
      .addTo(m);
    m.on('load', () => setLoading(false));
    setTimeout(() => setLoading(false), 2000);
    L.control.zoom({ position: 'bottomright' }).addTo(m);
    mapRef.current = m;
    const ro = new ResizeObserver(() => m.invalidateSize());
    ro.observe(divRef.current);
    return () => { ro.disconnect(); m.remove(); mapRef.current = null; };
  }, []);

  // Markers
  useEffect(() => {
    if (!mapRef.current) return;
    Object.values(mksRef.current).forEach(mk => { try { mapRef.current.removeLayer(mk); } catch (_) { } });
    mksRef.current = {};
    conts.forEach((c, i) => {
      const inRoute = routeIds.includes(c.id), idx = inRoute ? routeIds.indexOf(c.id) + 1 : null;
      const cForIcon = inRoute ? { ...c, rec: false, fill: 99 } : c;
      const mk = L.marker([c.lat, c.lng], { icon: mkIcon(cForIcon, idx, c.id === selId) });
      mk.on('click', e => { L.DomEvent.stopPropagation(e); clickRef.current && clickRef.current(c); });
      mk.addTo(mapRef.current);
      mksRef.current[c.id] = mk;
    });
  }, [conts, selId, routeIds]);

  // Route (OSRM)
  useEffect(() => {
    if (!mapRef.current) return;
    if (routeRef.current) { try { mapRef.current.removeLayer(routeRef.current); } catch (_) { } }
    routeRef.current = null;
    if (!routeIds.length) return;
    const pts = routeIds.map(id => conts.find(c => c.id === id)).filter(Boolean);
    if (pts.length < 2) return;
    const coords = pts.map(c => `${c.lng},${c.lat}`).join(';');
    fetch(`https://router.project-osrm.org/route/v1/driving/${coords}?overview=full&geometries=geojson`)
      .then(r => r.json())
      .then(data => {
        if (!mapRef.current) return;
        const geo = data?.routes?.[0]?.geometry;
        if (!geo) throw new Error('no geo');
        routeRef.current = L.geoJSON(geo, { style: { color: P.green, weight: 5, opacity: .85, lineCap: 'round' } }).addTo(mapRef.current);
      })
      .catch(() => {
        if (!mapRef.current) return;
        const fallback = pts.map(c => [c.lat, c.lng]);
        routeRef.current = L.polyline(fallback, { color: P.green, weight: 5, opacity: .85, dashArray: '10,5', lineCap: 'round' }).addTo(mapRef.current);
      });
  }, [routeIds]);

  return (
    <div style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
      <div ref={divRef} style={{ width: '100%', height: '100%' }} />
      {loading && <div style={{ position: 'absolute', inset: 0, background: 'rgba(245,245,245,.9)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 500 }}>
        <Spinner />
      </div>}
      {/* Legend */}
      {routeIds.length > 0 && <div style={{ position: 'absolute', bottom: 16, left: 12, zIndex: 400, background: 'rgba(255,255,255,.92)', backdropFilter: 'blur(6px)', borderRadius: 12, padding: '8px 12px', boxShadow: P.shadow }}>
        {[[P.green, '● Reciclaje'], [P.textSub, '■ Basura'], [P.warn, 'Nivel alto'], [P.crit, 'Crítico']].map(([c, l]) => (
          <div key={l} style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 3 }}>
            <div style={{ width: 9, height: 9, borderRadius: '50%', background: c, flexShrink: 0 }} />
            <span style={{ fontSize: 10, color: P.text, fontWeight: 500 }}>{l}</span>
          </div>
        ))}
      </div>}
    </div>
  );
}

/* ─── LOGIN ────────────────────────────────────────────── */
function LoginScreen({ onLogin }) {
  const [user, setUser] = useState(''), [pass, setPass] = useState(''),
    [err, setErr] = useState(''), [loading, setLoading] = useState(false);
  function submit(e) {
    e.preventDefault(); setErr(''); setLoading(true);
    setTimeout(() => {
      if ((user === 'reciclador' || user === 'transportista') && pass === '1234') onLogin(user);
      else { setErr('Usuario o contraseña incorrectos.'); setLoading(false); }
    }, 700);
  }
  return (
    <div className="screen-in" style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', background: P.bg, overflowY: 'auto', padding: '0 24px 32px' }}>
      {/* Hero */}
      <div style={{ width: '100%', background: `linear-gradient(160deg,${P.dark} 0%,#2E5A44 100%)`, borderRadius: '0 0 32px 32px', padding: '48px 24px 40px', marginBottom: 32, textAlign: 'center', marginLeft: -24, marginRight: -24, width: 'calc(100% + 48px)' }}>
        <img src="assets/logo4.png" style={{ width: 160, height: 160, display: 'block', margin: '0 auto -20px' }} />
        <div style={{ fontSize: 28, fontWeight: 800, color: 'white', letterSpacing: 2 }}>PAPOI</div>
        <div style={{ fontSize: 11, color: 'rgba(255,255,255,.5)', marginTop: 5, fontWeight: 400, letterSpacing: 1 }}>Bogotá · Residuos Inteligentes</div>
      </div>

      <div style={{ width: '100%' }}>
        <div style={{ fontSize: 20, fontWeight: 700, color: P.text, marginBottom: 4 }}>Iniciar sesión</div>
        <div style={{ fontSize: 13, color: P.textSub, marginBottom: 24 }}>Ingresa con tus credenciales</div>

        <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div>
            <div style={{ fontSize: 12, fontWeight: 600, color: P.text, marginBottom: 7 }}>Usuario</div>
            <input value={user} onChange={e => { setUser(e.target.value); setErr(''); }}
              placeholder="ej: reciclador"
              style={{ width: '100%', padding: '13px 16px', borderRadius: 16, border: `1.5px solid ${user ? P.sage : P.border}`, fontSize: 14, color: P.text, background: P.card, outline: 'none', boxShadow: user ? `0 0 0 3px ${P.sage}22` : 'none', transition: 'all .15s' }} />
          </div>
          <div>
            <div style={{ fontSize: 12, fontWeight: 600, color: P.text, marginBottom: 7 }}>Contraseña</div>
            <input type="password" value={pass} onChange={e => { setPass(e.target.value); setErr(''); }}
              placeholder="••••••"
              style={{ width: '100%', padding: '13px 16px', borderRadius: 16, border: `1.5px solid ${pass ? P.sage : P.border}`, fontSize: 14, color: P.text, background: P.card, outline: 'none', boxShadow: pass ? `0 0 0 3px ${P.sage}22` : 'none', transition: 'all .15s' }} />
          </div>
          {err && <div style={{ fontSize: 12, color: P.crit, background: '#FFF0EE', border: '1px solid #FFD0CC', borderRadius: 12, padding: '10px 14px', fontWeight: 500 }}>{err}</div>}
          <button type="submit" disabled={loading} style={{ background: loading ? P.sage : P.dark, color: 'white', border: 'none', borderRadius: 16, padding: '14px', fontSize: 15, fontWeight: 700, cursor: loading ? 'default' : 'pointer', boxShadow: `0 4px 16px ${P.dark}55`, marginTop: 4, transition: 'all .2s' }}>
            {loading ? <span className="pulse">Verificando…</span> : 'Ingresar →'}
          </button>
        </form>

        {/* Demo hints */}
        <Card style={{ marginTop: 24, padding: '14px 16px' }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: P.textSub, textTransform: 'uppercase', letterSpacing: .6, marginBottom: 10 }}>Cuentas de prueba</div>
          {[{ u: 'reciclador', r: 'Módulo Reciclador' }, { u: 'transportista', r: 'Panel Transportista' }].map(({ u, r }) => (
            <div key={u} onClick={() => { setUser(u); setPass('1234'); setErr(''); }}
              style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '9px 0', borderBottom: '1px solid #F0F0F0', cursor: 'pointer' }}>
              <div>
                <span style={{ fontSize: 13, fontWeight: 600, color: P.dark }}>{u}</span>
                <span style={{ fontSize: 12, color: P.textSub, marginLeft: 6 }}>/ 1234</span>
              </div>
              <Chip label={r} color={P.sage} />
            </div>
          ))}
        </Card>
      </div>
    </div>
  );
}

/* ─── RECICLADOR SCREENS ───────────────────────────────── */
function RecHome() {
  const routeConts = ROUTE_IDS.map(id => CONTAINERS.find(c => c.id === id)).filter(Boolean);
  const done = 2, total = ROUTE_IDS.length;
  return (
    <div className="sc screen-in" style={{ flex: 1, overflowY: 'auto', padding: '16px 16px 8px' }}>
      {/* Welcome */}
      <Card style={{ background: `linear-gradient(135deg,${P.dark},#2E5A44)`, color: 'white', marginBottom: 14, padding: '20px' }}>
        <div style={{ fontSize: 20, fontWeight: 700 }}>Carlos Ramos</div>
        <div style={{ fontSize: 12, opacity: .65, marginTop: 3 }}>Reciclador · Zona Sur · Ruta activa</div>
        <div style={{ marginTop: 14 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, opacity: .7, marginBottom: 5 }}>
            <span>Progreso de ruta</span><span>{done}/{total} paradas</span>
          </div>
          <div style={{ height: 5, background: 'rgba(255,255,255,.2)', borderRadius: 3 }}>
            <div style={{ height: '100%', width: `${done / total * 100}%`, background: 'white', borderRadius: 3 }} />
          </div>
        </div>
      </Card>

      {/* Stats */}
      <div style={{ display: 'flex', gap: 10, marginBottom: 14 }}>
        <StatCard icon={<img src="assets/reciclar.png" style={{ width: 24, height: 24, objectFit: 'contain' }} />} label="Kg hoy" value="47" color={P.green} />
        <StatCard icon={<img src="assets/hucha.png" style={{ width: 24, height: 24, objectFit: 'contain' }} />} label="Incentivos" value="$5,640" color={P.dark} />
        <StatCard icon={<img src="assets/CamionReciclaje.svg" style={{ width: 24, height: 24, objectFit: 'contain' }} />} label="Paradas" value={`${done}/${total}`} color={P.sage} />
      </div>

      {/* Route stops quick view */}
      <div style={{ fontSize: 13, fontWeight: 700, color: P.text, marginBottom: 10 }}>Paradas pendientes</div>
      {routeConts.slice(done).slice(0, 3).map((c, i) => (
        <Card key={c.id} style={{ marginBottom: 9, padding: '12px 14px' }}>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
            <div style={{ width: 32, height: 32, borderRadius: 12, background: mCol(c.fill, c.rec) + '22', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, flexShrink: 0 }}>
              {c.rec ? <img src="assets/reciclar.png" style={{ width: 18, height: 18, objectFit: 'contain' }} />
                : <img src="assets/compartimiento.png" style={{ width: 18, height: 18, objectFit: 'contain' }} />}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: P.text }}>{c.loc}</div>
              <div style={{ fontSize: 11, color: P.textSub, marginTop: 1 }}>{c.addr}</div>
            </div>
            <div style={{
              fontSize: 12, fontWeight: 700, padding: '3px 8px', borderRadius: 8,
              background: c.fill >= 85 ? P.crit + '22' : c.fill >= 65 ? P.warn + '22' : P.green + '22',
              color: c.fill >= 85 ? P.crit : c.fill >= 65 ? P.warn : P.green
            }}>
              {c.fill}%
            </div>
          </div>
        </Card>
      ))}
      <div style={{ height: 16 }} />
    </div>
  );
}

function MonitorContenedor({ cont, onBack }) {
  const anim = cont.fill;
  const col = anim >= 90 ? P.crit : anim >= 75 ? P.warn : anim >= 50 ? P.orange : P.green;
  const msg = anim >= 90 ? 'RECOLECCIÓN URGENTE' : anim >= 75 ? 'PROGRAMAR RECOLECCIÓN' : anim >= 50 ? 'EN OBSERVACIÓN' : 'SIN NOVEDAD';
  const msgCol = anim >= 90 ? P.crit : anim >= 75 ? P.warn : anim >= 50 ? P.orange : P.green;

  return (
    <div className="sc screen-in" style={{ flex: 1, overflowY: 'auto', background: P.bg }}>
      <SectionHeader title="Monitor de Contenedor" sub={cont.addr} onBack={onBack} />

      {/* Visualización del contenedor */}
      <div style={{ background: '#0D1410', padding: '24px 0', display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
        <div style={{ position: 'relative', width: 90, height: 140 }}>
          {/* Cuerpo contenedor */}
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 120, borderRadius: '4px 4px 8px 8px', background: '#1A2420', border: `1.5px solid #243329`, overflow: 'hidden' }}>
            {/* Relleno animado */}
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: `${anim}%`, background: col, opacity: .85, transition: 'height .4s ease' }} />
            <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontSize: 13, fontWeight: 700, color: anim > 20 ? '#0D1410' : '#6B8F7A' }}>{anim.toFixed(0)}%</span>
            </div>
          </div>
          {/* Tapa */}
          <div style={{ position: 'absolute', top: 0, left: -4, right: -4, height: 16, borderRadius: 4, background: '#1F2B26', border: '1.5px solid #243329' }} />
          {/* Asa */}
          <div style={{ position: 'absolute', top: -8, left: '50%', transform: 'translateX(-50%)', width: 18, height: 10, borderRadius: '4px 4px 0 0', background: '#243329' }} />
          {/* Ruedas */}
          <div style={{ position: 'absolute', bottom: -6, left: 8, width: 14, height: 14, borderRadius: '50%', background: '#1F2B26', border: '1.5px solid #243329' }} />
          <div style={{ position: 'absolute', bottom: -6, right: 8, width: 14, height: 14, borderRadius: '50%', background: '#1F2B26', border: '1.5px solid #243329' }} />
        </div>

        {/* Chip estado */}
        <div style={{ position: 'absolute', top: 14, right: 14, background: col, borderRadius: 8, padding: '4px 10px' }}>
          <span style={{ fontSize: 10, fontWeight: 700, color: 'white' }}>● EN CURSO</span>
        </div>
      </div>

      <div style={{ padding: '16px 16px 8px' }}>
        {/* Card principal */}
        <Card style={{ marginBottom: 12 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
            <div>
              <div style={{ fontSize: 15, fontWeight: 700, color: P.text }}>{cont.loc} · {cont.id.toUpperCase()}</div>
              <div style={{ fontSize: 11, color: P.textSub, marginTop: 2 }}>{cont.addr}</div>
            </div>
            <img src={cont.rec ? 'assets/reciclar.png' : 'assets/compartimiento.png'} style={{ width: 32, height: 32, objectFit: 'contain' }} />
          </div>

          <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 4 }}>
            <span style={{ fontSize: 42, fontWeight: 800, color: col, lineHeight: 1 }}>{anim.toFixed(1)}%</span>
            <span style={{ fontSize: 12, color: P.textSub }}>llenado</span>
          </div>
          <div style={{ fontSize: 12, fontWeight: 700, color: msgCol, marginBottom: 12 }}>{msg}</div>

          <FillBar val={anim} h={10} />
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4 }}>
            {[['0%', 0], ['50%', 50], ['75%', 75], ['90%', 90], ['100%', 100]].map(([l, v]) => (
              <span key={l} style={{ fontSize: 9, color: P.textSub }}>{l}</span>
            ))}
          </div>
        </Card>

        {/* Info del contenedor */}
        <Card style={{ marginBottom: 12, padding: '14px 16px' }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: P.textSub, textTransform: 'uppercase', letterSpacing: .5, marginBottom: 10 }}>Detalles</div>
          {[
            ['Tipo de residuo', cont.type],
            ['Aprovechable', cont.rec ? 'Sí ♻' : 'No'],
            ['Zona', cont.loc],
            ['ID Contenedor', cont.id.toUpperCase()],
          ].map(([l, v]) => (
            <div key={l} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: `1px solid ${P.border}` }}>
              <span style={{ fontSize: 12, color: P.textSub }}>{l}</span>
              <span style={{ fontSize: 12, fontWeight: 600, color: P.text }}>{v}</span>
            </div>
          ))}
        </Card>

        {/* Historial simulado */}
        <Card style={{ marginBottom: 16, padding: '14px 16px' }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: P.textSub, textTransform: 'uppercase', letterSpacing: .5, marginBottom: 10 }}>Últimas lecturas</div>
          {[
            { hora: '12:45', pct: cont.fill, col: col },
            { hora: '11:30', pct: Math.max(0, cont.fill - 8), col: P.warn },
            { hora: '10:15', pct: Math.max(0, cont.fill - 18), col: P.green },
            { hora: '09:00', pct: Math.max(0, cont.fill - 30), col: P.green },
          ].map((r, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '7px 0', borderBottom: `1px solid ${P.border}` }}>
              <span style={{ fontSize: 11, color: P.textSub }}>{r.hora}</span>
              <div style={{ flex: 1, margin: '0 12px' }}>
                <div style={{ height: 4, background: '#EBEBEB', borderRadius: 2 }}>
                  <div style={{ height: '100%', width: `${r.pct}%`, background: r.col, borderRadius: 2 }} />
                </div>
              </div>
              <span style={{ fontSize: 11, fontWeight: 600, color: r.col }}>{r.pct}%</span>
            </div>
          ))}
        </Card>
      </div>
    </div>
  );
}

function RecMapa() {
  const [selCont, setSelCont] = useState(null);
  const [monitor, setMonitor] = useState(null);
  if (monitor) return <MonitorContenedor cont={monitor} onBack={() => setMonitor(null)} />;
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <MapView key="rec-map" conts={CONTAINERS} routeIds={ROUTE_IDS}
        selId={selCont?.id} onContClick={c => setSelCont(p => p?.id === c.id ? null : c)}
        center={[4.575, -74.155]} zoom={13} />
      {selCont && (
        <div style={{ flexShrink: 0, background: P.card, padding: '14px 16px', borderTop: `1px solid ${P.border}`, boxShadow: '0 -4px 16px rgba(0,0,0,.07)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, color: P.text }}>{selCont.loc}</div>
              <div style={{ fontSize: 11, color: P.textSub, marginTop: 1 }}>{selCont.addr}</div>
            </div>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <img src={selCont.rec ? 'assets/reciclar.png' : 'assets/compartimiento.png'} style={{ width: 28, height: 28, objectFit: 'contain' }} />
              {selCont.rec && <Chip label="♻ Reciclaje" color={P.green} />}
              <button onClick={() => setSelCont(null)} style={{ background: '#F0F0F0', border: 'none', borderRadius: 10, width: 28, height: 28, cursor: 'pointer', fontSize: 16 }}>×</button>
            </div>
          </div>
          <div style={{ marginTop: 10 }}><FillBar val={selCont.fill} /></div>
          <div style={{ fontSize: 11, color: P.textSub, marginTop: 4 }}>{selCont.fill}% lleno · {selCont.type}</div>
          <button onClick={() => setMonitor(selCont)} style={{ width: '100%', marginTop: 12, background: P.dark, color: 'white', border: 'none', borderRadius: 14, padding: '11px', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>
            Ver monitor en tiempo real →
          </button>
        </div>
      )}
    </div>
  );
}

function RecHistorial() {
  const PRECIOS = {
    'Cartón': 175, 'Mixto': 160, 'Plástico': 250,
    'Residuos': 0, 'Vidrio': 120, 'Metal': 260,
  };
  const hist = [
    {
      date: 'Hoy 20 Abr', items: [
        { cont: 'Kennedy c01', kg: 18, mat: 'Cartón' },
        { cont: 'Bosa c12', kg: 22, mat: 'Mixto' },
        { cont: 'C. Bolívar c07', kg: 7, mat: 'Plástico' },
      ]
    },
    {
      date: '19 Abr', items: [
        { cont: 'Kennedy c03', kg: 14, mat: 'Cartón' },
        { cont: 'C. Bolívar c09', kg: 19, mat: 'Plástico' },
      ]
    },
    {
      date: '18 Abr', items: [
        { cont: 'Kennedy c01', kg: 21, mat: 'Mixto' },
        { cont: 'Bosa c12', kg: 15, mat: 'Cartón' },
        { cont: 'C. Bolívar c08', kg: 11, mat: 'Residuos' },
      ]
    },
  ];
  const totalKg = hist.flatMap(d => d.items).reduce((a, i) => a + i.kg, 0);
  const totalCOP = hist.flatMap(d => d.items).reduce((a, i) => a + (i.kg * (PRECIOS[i.mat] || 0)), 0);
  return (
    <div className="sc screen-in" style={{ flex: 1, overflowY: 'auto', padding: '16px 16px 8px' }}>
      <Card style={{ background: P.dark, color: 'white', marginBottom: 16 }}>
        <div style={{ fontSize: 11, opacity: .55, marginBottom: 3 }}>Abril 2026 · Total acumulado</div>
        <div style={{ fontSize: 26, fontWeight: 800 }}>{totalKg} kg</div>
        <div style={{ fontSize: 13, color: 'rgba(255,255,255,.65)', marginTop: 2 }}>${totalCOP.toLocaleString('es-CO')} COP en incentivos</div>
        <div style={{ marginTop: 12, display: 'flex', gap: 16 }}>
          {[['Rutas', '12'], ['Paradas', '38'], ['CO₂ evitado', `${(totalKg * 2.02 / 1000).toFixed(2)}t`]].map(([l, v]) => (
            <div key={l}>
              <div style={{ fontSize: 15, fontWeight: 700 }}>{v}</div>
              <div style={{ fontSize: 10, opacity: .5 }}>{l}</div>
            </div>
          ))}
        </div>
      </Card>
      <Card style={{ marginBottom: 16, padding: '14px 16px' }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: P.textSub, textTransform: 'uppercase', letterSpacing: .5, marginBottom: 10 }}>
          Precios de referencia · Bogotá
        </div>
        {[
          { mat: 'Cartón', precio: '$150 - $200' },
          { mat: 'Plástico', precio: '$200 - $300' },
          { mat: 'Metal', precio: '$200 - $260' },
          { mat: 'Vidrio', precio: '$100 - $150' },
          { mat: 'Mixto', precio: '$140 - $180' },
          { mat: 'Residuos', precio: 'No remunerado' },
        ].map(({ mat, precio }) => (
          <div key={mat} style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            padding: '8px 0', borderBottom: `1px solid ${P.border}`
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <Chip label={mat} color={P.sage} />
            </div>
            <span style={{ fontSize: 12, fontWeight: 600, color: mat === 'Residuos' ? P.textSub : P.dark }}>{precio} /kg</span>
          </div>
        ))}
        <div style={{ fontSize: 10, color: P.textSub, marginTop: 8 }}>
          * Precios orientativos COP · varían según calidad y volumen
        </div>
      </Card>
      {hist.map(day => (
        <div key={day.date} style={{ marginBottom: 18 }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: P.textSub, textTransform: 'uppercase', letterSpacing: .5, marginBottom: 8 }}>{day.date}</div>
          {day.items.map((it, i) => (
            <Card key={i} style={{ marginBottom: 8, padding: '12px 14px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: P.text }}>{it.cont}</div>
                  <div style={{ display: 'flex', gap: 6, marginTop: 4, alignItems: 'center' }}>
                    <Chip label={it.mat} color={P.sage} />
                    <span style={{ fontSize: 10, color: P.textSub }}>${(PRECIOS[it.mat] || 0).toLocaleString()}/kg</span>
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: 16, fontWeight: 700, color: P.dark }}>{it.kg} kg</div>
                  <div style={{ fontSize: 11, color: PRECIOS[it.mat] ? P.green : P.textSub, fontWeight: 600 }}>
                    {PRECIOS[it.mat] ? `$${(it.kg * PRECIOS[it.mat]).toLocaleString('es-CO')} COP` : 'No remunerado'}
                  </div>
                </div>
              </div>
            </Card>
          ))}
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 4px' }}>
            <span style={{ fontSize: 11, color: P.textSub }}>Subtotal {day.date}</span>
            <span style={{ fontSize: 12, fontWeight: 700, color: P.dark }}>
              ${day.items.reduce((a, i) => a + (i.kg * (PRECIOS[i.mat] || 0)), 0).toLocaleString('es-CO')} COP
            </span>
          </div>
        </div>
      ))}
      <div style={{ height: 16 }} />
    </div>
  );
}

function RecPerfil({ onLogout, darkMap, setDarkMap }) {
  const [notif, setNotif] = useState(true), [gps, setGps] = useState(true);
  function Toggle({ on, onT }) {
    return <div onClick={onT} style={{ width: 44, height: 25, borderRadius: 13, background: on ? P.dark : '#DDD', cursor: 'pointer', position: 'relative', transition: 'background .2s', flexShrink: 0 }}>
      <div style={{ position: 'absolute', top: 3, left: on ? 22 : 3, width: 19, height: 19, borderRadius: '50%', background: 'white', transition: 'left .2s', boxShadow: '0 1px 4px rgba(0,0,0,.2)' }} />
    </div>;
  }
  return (
    <div className="sc screen-in" style={{ flex: 1, overflowY: 'auto', padding: '16px 16px 8px' }}>
      {/* Avatar */}
      <Card style={{ textAlign: 'center', marginBottom: 14, padding: '24px' }}>
        <div style={{ width: 72, height: 72, borderRadius: '50%', background: P.dark, margin: '0 auto 12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 26, fontWeight: 700, color: 'white' }}>CR</div>
        <div style={{ fontSize: 18, fontWeight: 700, color: P.text }}>Carlos Ramos</div>
        <div style={{ fontSize: 12, color: P.textSub, marginTop: 3 }}>Reciclador · Zona Sur · ID REC-0847</div>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 24, marginTop: 14 }}>
          {[['318 kg', 'Este mes'], ['$38K', 'Incentivos'], ['12', 'Rutas']].map(([v, l]) => (
            <div key={l} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 16, fontWeight: 700, color: P.dark }}>{v}</div>
              <div style={{ fontSize: 10, color: P.textSub }}>{l}</div>
            </div>
          ))}
        </div>
      </Card>
      <Card style={{ marginBottom: 14 }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: P.textSub, textTransform: 'uppercase', letterSpacing: .5, marginBottom: 12 }}>Configuración</div>
        {[
          { l: 'Notificaciones', sub: 'Alertas de contenedores', on: notif, set: setNotif },
          { l: 'GPS en segundo plano', sub: 'Seguimiento de ruta', on: gps, set: setGps },
          { l: 'Mapa oscuro', sub: 'Fondo oscuro en mapa', on: darkMap, set: setDarkMap },
        ].map(({ l, sub, on, set }) => (
          <div key={l} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '11px 0', borderBottom: `1px solid ${P.border}` }}>
            <div><div style={{ fontSize: 13, fontWeight: 500, color: P.text }}>{l}</div><div style={{ fontSize: 11, color: P.textSub }}>{sub}</div></div>
            <Toggle on={on} onT={() => set(v => !v)} />
          </div>
        ))}
      </Card>
      <button onClick={onLogout} style={{ width: '100%', background: '#FFF0EE', color: P.crit, border: `1px solid ${P.crit}33`, borderRadius: 16, padding: '13px', fontSize: 14, fontWeight: 600, cursor: 'pointer', marginBottom: 24 }}>
        Cerrar sesión
      </button>
    </div>
  );
}

/* ─── TRANSPORTISTA SCREENS ────────────────────────────── */
function TrHome() {
  return (
    <div className="sc screen-in" style={{ flex: 1, overflowY: 'auto', padding: '16px 16px 8px' }}>
      <Card style={{ background: `linear-gradient(135deg,${P.dark},#1A3525)`, color: 'white', marginBottom: 14, padding: '20px' }}>
        <div style={{ fontSize: 12, opacity: .6, marginBottom: 4, display: 'flex', alignItems: 'center', gap: 6 }}>Panel de control <img src="assets/CamionReciclaje.svg" style={{ width: 16, height: 16, objectFit: 'contain', filter: 'brightness(0) invert(1)' }} /></div>
        <div style={{ fontSize: 20, fontWeight: 700 }}>Transportista</div>
        <div style={{ fontSize: 12, opacity: .6, marginTop: 3 }}>2 rutas activas · 4 vehículos en flota</div>
      </Card>
      <div style={{ display: 'flex', gap: 10, marginBottom: 14 }}>
        <StatCard icon={<img src="assets/carreteras.png" style={{ width: 24, height: 24, objectFit: 'contain' }} />} label="Rutas activas" value="2" />
        <StatCard icon={<img src="assets/equilibrio.png" style={{ width: 24, height: 24, objectFit: 'contain' }} />} label="Kg en tránsito" value="8,460" />
      </div>
      <div style={{ display: 'flex', gap: 10, marginBottom: 14 }}>
        <StatCard icon="✅" label="Completadas" value="1" small />
        <StatCard icon={<img src="assets/autobus.png" style={{ width: 18, height: 18, objectFit: 'contain' }} />} label="Flota activa" value="2/4" small />
        <StatCard icon={<img src="assets/Reciclaje.svg" style={{ width: 18, height: 18, objectFit: 'contain' }} />} label="Entregados kg" value={TRANSPORT_ROUTES.filter(r => r.status === 'completada').reduce((a, r) => a + r.kg, 0).toLocaleString()} small />
      </div>
      <div style={{ fontSize: 13, fontWeight: 700, color: P.text, marginBottom: 10 }}>Rutas de hoy</div>
      {TRANSPORT_ROUTES.map(r => {
        const sc = r.status === 'en curso' ? P.green : r.status === 'completada' ? P.sage : P.warn;
        return (
          <Card key={r.id} style={{ marginBottom: 9, padding: '13px 14px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: P.text }}>{r.id} · Zona {r.zone}</div>
              <Chip label={r.status.toUpperCase()} color={sc} />
            </div>
            <div style={{ fontSize: 11, color: P.textSub, marginBottom: 7 }}>{r.driver} · {r.stops} paradas · {r.kg.toLocaleString()} kg</div>
            <FillBar val={r.pct} />
            <div style={{ fontSize: 10, color: P.textSub, marginTop: 4, textAlign: 'right' }}>{r.pct}% completado</div>
          </Card>
        );
      })}
      <div style={{ height: 16 }} />
    </div>
  );
}

function TrMapa() {
  const [sel, setSel] = useState(null);
  const [selCont, setSelCont] = useState(null);
  const [monitor, setMonitor] = useState(null);
  if (monitor) return <MonitorContenedor cont={monitor} onBack={() => setMonitor(null)} />;
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <div style={{ padding: '10px 14px', background: P.card, borderBottom: `1px solid ${P.border}`, flexShrink: 0 }}>
        <select value={sel?.id || ''} onChange={e => {
          const found = TRANSPORT_ROUTES.find(r => r.id === e.target.value) || null;
          setSel(found); setSelCont(null);
        }}
          style={{
            width: '100%', padding: '10px 14px', borderRadius: 14, border: `1.5px solid ${P.border}`,
            fontSize: 13, fontWeight: 600, color: sel ? P.dark : P.textSub, background: P.card,
            outline: 'none', cursor: 'pointer', appearance: 'none',
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23254336' stroke-width='2.5'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E")`,
            backgroundRepeat: 'no-repeat', backgroundPosition: 'right 14px center'
          }}>
          <option value=''>Selecciona una ruta…</option>
          {TRANSPORT_ROUTES.map(r => (
            <option key={r.id} value={r.id}>{r.id} · Zona {r.zone} · {r.driver}</option>
          ))}
        </select>
        {sel && (
          <div style={{ display: 'flex', gap: 8, marginTop: 8, alignItems: 'center' }}>
            <Chip label={sel.status.toUpperCase()} color={sel.status === 'en curso' ? P.green : sel.status === 'completada' ? P.sage : P.warn} />
            <span style={{ fontSize: 11, color: P.textSub }}>{sel.stops} paradas · {sel.kg.toLocaleString()} kg</span>
          </div>
        )}
      </div>
      <MapView key={`tr-map-${sel?.id || 'all'}`} conts={CONTAINERS}
        routeIds={sel ? ROUTES_BY_TR[sel.id] || [] : []}
        selId={selCont?.id}
        onContClick={c => setSelCont(p => p?.id === c.id ? null : c)}
        center={[4.65, -74.09]} zoom={11} />
      {selCont && (
        <div style={{ flexShrink: 0, background: P.card, padding: '14px 16px', borderTop: `1px solid ${P.border}`, boxShadow: '0 -4px 16px rgba(0,0,0,.07)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, color: P.text }}>{selCont.loc}</div>
              <div style={{ fontSize: 11, color: P.textSub, marginTop: 1 }}>{selCont.addr}</div>
            </div>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <img src={selCont.rec ? 'assets/reciclar.png' : 'assets/compartimiento.png'} style={{ width: 28, height: 28, objectFit: 'contain' }} />
              {selCont.rec && <Chip label="♻ Reciclaje" color={P.green} />}
              <button onClick={() => setSelCont(null)} style={{ background: '#F0F0F0', border: 'none', borderRadius: 10, width: 28, height: 28, cursor: 'pointer', fontSize: 16 }}>×</button>
            </div>
          </div>
          <div style={{ marginTop: 10 }}><FillBar val={selCont.fill} /></div>
          <div style={{ fontSize: 11, color: P.textSub, marginTop: 4 }}>{selCont.fill}% lleno · {selCont.type}</div>
          <button onClick={() => setMonitor(selCont)} style={{ width: '100%', marginTop: 12, background: P.dark, color: 'white', border: 'none', borderRadius: 14, padding: '11px', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>
            Ver monitor en tiempo real →
          </button>
        </div>
      )}
    </div>
  );
}

function TrFlota() {
  return (
    <div className="sc screen-in" style={{ flex: 1, overflowY: 'auto', padding: '16px 16px 8px' }}>
      {VEHICLES.map(v => {
        const sc = v.status === 'activo' ? P.green : v.status === 'mant.' ? P.crit : P.sage;
        const pct = Math.round(v.load / v.cap * 100);
        const route = TRANSPORT_ROUTES.find(r => r.driver && v.status === 'activo' &&
          (v.id === 'CAM-001' ? r.id === 'TR-01' : v.id === 'CAM-003' ? r.id === 'TR-04' : false));
        const eta = route ? `~${Math.round((100 - route.pct) * 0.8 + 10)} min` : null;
        return (
          <Card key={v.id} style={{ marginBottom: 12 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
              <div>
                <div style={{ fontSize: 14, fontWeight: 700, color: P.text }}>{v.id}</div>
                <div style={{ fontSize: 11, color: P.textSub }}>Placa {v.plate}</div>
              </div>
              <Chip label={v.status.toUpperCase()} color={sc} />
            </div>

            {/* Carga total */}
            <div style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              background: '#F8F8F8', borderRadius: 12, padding: '10px 14px', marginBottom: 10
            }}>
              <div>
                <div style={{ fontSize: 11, color: P.textSub }}>Carga total</div>
                <div style={{ fontSize: 18, fontWeight: 700, color: P.dark }}>{v.load.toLocaleString()} kg</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: 11, color: P.textSub }}>Capacidad</div>
                <div style={{ fontSize: 13, fontWeight: 600, color: P.text }}>{v.cap.toLocaleString()} kg</div>
              </div>
            </div>

            {/* Barra carga */}
            <div style={{ marginBottom: 10 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                <span style={{ fontSize: 11, color: P.textSub }}>Ocupación</span>
                <span style={{ fontSize: 11, fontWeight: 600, color: P.text }}>{pct}%</span>
              </div>
              <div style={{ height: 5, background: '#EBEBEB', borderRadius: 3 }}>
                <div style={{ height: '100%', width: `${pct}%`, background: P.blue, borderRadius: 3 }} />
              </div>
            </div>

            {/* ETA próxima parada */}
            {eta && <div style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              borderTop: `1px solid ${P.border}`, paddingTop: 10
            }}>
              <div style={{ fontSize: 11, color: P.textSub }}>Próxima parada aprox.</div>
              <div style={{ fontSize: 13, fontWeight: 700, color: P.green }}>{eta}</div>
            </div>}

            {/* Combustible */}
            <div style={{ marginTop: eta ? 10 : 0 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                <span style={{ fontSize: 11, color: P.textSub }}>Combustible</span>
                <span style={{
                  fontSize: 11, fontWeight: 600,
                  color: v.fuel < 25 ? P.crit : P.text
                }}>{v.fuel}%</span>
              </div>
              <div style={{ height: 5, background: '#EBEBEB', borderRadius: 3 }}>
                <div style={{
                  height: '100%', width: `${v.fuel}%`,
                  background: v.fuel < 25 ? P.crit : P.green, borderRadius: 3
                }} />
              </div>
            </div>

          </Card>
        );
      })}
      <div style={{ height: 16 }} />
    </div>
  );
}

function TrHistorial() {
  const PRECIO_PROM = 185;
  const hist = [
    { date: '30 Abr', rutas: 3, kg: 9420, status: 'completada' },
    { date: '29 Abr', rutas: 4, kg: 11200, status: 'completada' },
    { date: '28 Abr', rutas: 3, kg: 8750, status: 'completada' },
    { date: '27 Abr', rutas: 2, kg: 6300, status: 'completada' },
    { date: '26 Abr', rutas: 4, kg: 10800, status: 'completada' },
  ];
  const totalKg = hist.reduce((a, d) => a + d.kg, 0);
  const totalCOP = totalKg * PRECIO_PROM;
  return (
    <div className="sc screen-in" style={{ flex: 1, overflowY: 'auto', padding: '16px 16px 8px' }}>
      <Card style={{ background: P.dark, color: 'white', marginBottom: 14 }}>
        <div style={{ fontSize: 11, opacity: .55, marginBottom: 3 }}>Semana actual · Total</div>
        <div style={{ fontSize: 26, fontWeight: 800 }}>{totalKg.toLocaleString()} kg</div>
        <div style={{ fontSize: 13, color: 'rgba(255,255,255,.65)', marginTop: 2 }}>${totalCOP.toLocaleString('es-CO')} COP valor estimado</div>
        <div style={{ marginTop: 12, display: 'flex', gap: 16 }}>
          {[['Rutas', hist.reduce((a, d) => a + d.rutas, 0)], ['CO₂ evitado', `${(totalKg * 2.02 / 1000).toFixed(2)}t`], ['Precio/kg', `$${PRECIO_PROM}`]].map(([l, v]) => (
            <div key={l}>
              <div style={{ fontSize: 15, fontWeight: 700 }}>{v}</div>
              <div style={{ fontSize: 10, opacity: .5 }}>{l}</div>
            </div>
          ))}
        </div>
      </Card>

      {/* Precios referencia */}
      <Card style={{ marginBottom: 14, padding: '14px 16px' }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: P.textSub, textTransform: 'uppercase', letterSpacing: .5, marginBottom: 10 }}>
          Precios de referencia · Bogotá
        </div>
        {[
          { mat: 'Cartón', precio: '$150 - $200' },
          { mat: 'Plástico', precio: '$200 - $300' },
          { mat: 'Metal', precio: '$200 - $260' },
          { mat: 'Vidrio', precio: '$100 - $150' },
          { mat: 'Mixto', precio: '$140 - $180' },
          { mat: 'Residuos', precio: 'No remunerado' },
        ].map(({ mat, precio }) => (
          <div key={mat} style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            padding: '8px 0', borderBottom: `1px solid ${P.border}`
          }}>
            <Chip label={mat} color={P.sage} />
            <span style={{ fontSize: 12, fontWeight: 600, color: mat === 'Residuos' ? P.textSub : P.dark }}>{precio} /kg</span>
          </div>
        ))}
        <div style={{ fontSize: 10, color: P.textSub, marginTop: 8 }}>* Precios orientativos COP · varían según calidad y volumen</div>
      </Card>

      {/* Registro diario */}
      <div style={{ fontSize: 13, fontWeight: 700, color: P.text, marginBottom: 10 }}>Registro diario</div>
      {hist.map((d, i) => (
        <Card key={i} style={{ marginBottom: 9, padding: '13px 15px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: P.text }}>{d.date}</div>
            <Chip label="COMPLETADA" color={P.sage} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: 11, color: P.textSub }}>{d.rutas} rutas · {d.kg.toLocaleString()} kg</div>
              <div style={{ fontSize: 10, color: P.textSub, marginTop: 2 }}>CO₂ evitado: {(d.kg * 2.02 / 1000).toFixed(2)}t</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: P.dark }}>${(d.kg * PRECIO_PROM).toLocaleString('es-CO')}</div>
              <div style={{ fontSize: 10, color: P.textSub }}>COP estimado</div>
            </div>
          </div>
        </Card>
      ))}
      <div style={{ height: 16 }} />
    </div>
  );
}

function TrPerfil({ onLogout }) {
  return (
    <div className="sc screen-in" style={{ flex: 1, overflowY: 'auto', padding: '16px 16px 8px' }}>
      <Card style={{ textAlign: 'center', marginBottom: 14, padding: '24px' }}>
        <div style={{ width: 72, height: 72, borderRadius: '50%', background: P.sage, margin: '0 auto 12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, fontWeight: 700, color: 'white' }}>T</div>
        <div style={{ fontSize: 18, fontWeight: 700, color: P.text }}>Transportista</div>
        <div style={{ fontSize: 12, color: P.textSub, marginTop: 3 }}>ID TRANS-0124 · Flota Sur</div>
      </Card>
      <button onClick={onLogout} style={{ width: '100%', background: '#FFF0EE', color: P.crit, border: `1px solid ${P.crit}33`, borderRadius: 16, padding: '13px', fontSize: 14, fontWeight: 600, cursor: 'pointer', marginBottom: 8 }}>
        Cerrar sesión
      </button>
    </div>
  );
}

/* ─── STATUS BAR ───────────────────────────────────────── */
function StatusBar() {
  const [t, setT] = useState('');
  useEffect(() => {
    const up = () => setT(new Date().toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit' }));
    up(); const id = setInterval(up, 1000); return () => clearInterval(id);
  }, []);
  return (
    <div style={{
      height: 44, background: P.dark, display: 'flex', alignItems: 'flex-end',
      padding: '0 22px 8px', justifyContent: 'space-between', flexShrink: 0, position: 'relative'
    }}>
      <span style={{ color: 'white', fontSize: 13, fontWeight: 600 }}>{t}</span>
      <div style={{
        width: 110, height: 28, background: 'rgba(0,0,0,.5)', borderRadius: 14,
        position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)'
      }} />
      <div style={{ display: 'flex', gap: 5, alignItems: 'center' }}>
        <svg width="15" height="11" viewBox="0 0 15 11" fill="white" opacity=".8">
          <rect x="0" y="7" width="3" height="4" rx="1" /><rect x="4" y="4" width="3" height="7" rx="1" />
          <rect x="8" y="1" width="3" height="10" rx="1" /><rect x="12" y="0" width="3" height="11" rx="1" />
        </svg>
        <svg width="18" height="11" viewBox="0 0 18 11" fill="none">
          <rect x="0" y="0" width="16" height="11" rx="3" stroke="white" strokeWidth="1" opacity=".6" />
          <rect x="1" y="1" width="12" height="9" rx="2" fill="white" />
          <rect x="17" y="3.5" width="1" height="4" rx=".5" fill="white" opacity=".5" />
        </svg>
      </div>
    </div>
  );
}

/* ─── BOTTOM NAV ───────────────────────────────────────── */
function BottomNav({ tabs, active, onTab }) {
  return (
    <div style={{
      height: 66, background: P.card, borderTop: `1px solid ${P.border}`,
      display: 'flex', flexShrink: 0, paddingBottom: 4,
      boxShadow: '0 -2px 12px rgba(0,0,0,.06)'
    }}>
      {tabs.map(t => (
        <button key={t.id} onClick={() => onTab(t.id)} style={{
          flex: 1, background: 'none', border: 'none', cursor: 'pointer',
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 3, padding: '6px 2px 4px',
          transition: 'opacity .1s'
        }}>
          <div style={{ transition: 'transform .2s', transform: active === t.id ? 'translateY(-2px)' : 'none' }}>
            <NavIcon id={t.id} active={active === t.id} />
          </div>
          <span style={{
            fontSize: 9.5, fontWeight: active === t.id ? 700 : 400,
            color: active === t.id ? P.dark : P.textSub, lineHeight: 1
          }}>{t.label}</span>
          {active === t.id && <div style={{ width: 4, height: 4, borderRadius: '50%', background: P.dark, marginTop: 1 }} />}
        </button>
      ))}
    </div>
  );
}

function NavIcon({ id, active }) {
  const col = active ? P.dark : P.textSub, s = 22;
  const p = { width: s, height: s, viewBox: '0 0 24 24', fill: 'none', stroke: col, strokeWidth: active ? 2.2 : 1.8, strokeLinecap: 'round', strokeLinejoin: 'round' };
  const icons = {
    home: <img src="assets/casa.png" style={{ width: s, height: s, objectFit: 'contain', opacity: active ? 1 : .45 }} />,
    map: <img src="assets/mapas-y-banderas.png" style={{ width: s, height: s, objectFit: 'contain', opacity: active ? 1 : .45 }} />,
    history: <img src="assets/Reciclaje.svg" style={{ width: s, height: s, objectFit: 'contain', opacity: active ? 1 : .45 }} />,
    profile: <img src="assets/usuario.png" style={{ width: s, height: s, objectFit: 'contain', opacity: active ? 1 : .45 }} />,
    vehicles: <img src="assets/autobus.png" style={{ width: s, height: s, objectFit: 'contain', opacity: active ? 1 : .45 }} />,
  };
  return icons[id] || <div style={{ width: s, height: s }} />;
}

/* ─── PHONE APPS ───────────────────────────────────────── */
function RecicladorApp({ onLogout }) {
  const [tab, setTab] = useState('home');
  const [dark, setDark] = useState(false);
  const REC_TABS = [{ id: 'home', label: 'Inicio' }, { id: 'map', label: 'Mapa' }, { id: 'history', label: 'Historial' }, { id: 'profile', label: 'Perfil' }];
  const headers = { home: 'Inicio', map: 'Mapa · Ruta Sur', history: 'Mi Historial', profile: 'Mi Perfil' };
  const subs = { home: 'Bienvenido a PAPOI', map: 'Contenedores de tu ruta', history: 'Actividad y ganancias', profile: 'Configuración' };
  const screens = {
    home: <RecHome />,
    map: <RecMapa />,
    history: <RecHistorial />,
    profile: <RecPerfil onLogout={onLogout} darkMap={dark} setDarkMap={setDark} />,
  };
  return <>
    <StatusBar />
    <SectionHeader title={headers[tab]} sub={subs[tab]} />
    <div key={tab} style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      {screens[tab]}
    </div>
    <BottomNav tabs={REC_TABS} active={tab} onTab={setTab} />
  </>;
}

function TransportistaApp({ onLogout }) {
  const [tab, setTab] = useState('home');
  const TR_TABS = [{ id: 'home', label: 'Inicio' }, { id: 'map', label: 'Mapa' }, { id: 'vehicles', label: 'Flota' }, { id: 'history', label: 'Historial' }];
  const headers = { home: 'Inicio', map: 'Mapa · Rutas', vehicles: 'Mi Flota', history: 'Historial' };
  const subs = { home: 'Panel transportista', map: 'Trayectos activos', vehicles: 'Estado de vehículos', history: 'Registro diario' };
  const screens = {
    home: <TrHome />,
    map: <TrMapa />,
    vehicles: <TrFlota />,
    history: <TrHistorial />,
  };
  return <>
    <StatusBar />
    <SectionHeader title={headers[tab]} sub={subs[tab]}
      right={<button onClick={onLogout} style={{ background: 'rgba(244,67,54,.15)', color: '#FF8A80', border: 'none', borderRadius: 12, padding: '6px 12px', fontSize: 11, fontWeight: 600, cursor: 'pointer' }}>Salir</button>} />
    <div key={tab} style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      {screens[tab]}
    </div>
    <BottomNav tabs={TR_TABS} active={tab} onTab={setTab} />
  </>;
}

/* ─── ROOT ─────────────────────────────────────────────── */
function App() {
  const [user, setUser] = useState(null);
  return (
    <div className="phone">
      {!user && <LoginScreen onLogin={setUser} />}
      {user === 'reciclador' && <RecicladorApp onLogout={() => setUser(null)} />}
      {user === 'transportista' && <TransportistaApp onLogout={() => setUser(null)} />}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);