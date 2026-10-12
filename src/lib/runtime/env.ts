// SIKU — environnement GTA transmis par le client Lua (voir templates/resource/client/siku_ui.lua) :
// SendNUIMessage({ type = 'siku:env', data = { safeZone = 0.95, minimap = { x, y, w, h }, uiScale = 1.0 } })
// minimap en fractions d'écran (0–1). safeZone = GetSafeZoneSize().
import { onNuiMessage } from './nui';
import { applyScale, setUserScale } from './scale';
import { initInput } from './input';

export type GtaEnv = { safeZone?: number; minimap?: { x: number; y: number; w: number; h: number }; uiScale?: number };

export function applyEnv(env: GtaEnv) {
  const root = document.documentElement.style;
  const W = window.innerWidth, H = window.innerHeight;
  if (env.safeZone !== undefined) {
    const m = (1 - env.safeZone) / 2;
    root.setProperty('--safe-x', `${Math.round(W * m)}px`);
    root.setProperty('--safe-y', `${Math.round(H * m)}px`);
  }
  if (env.minimap) {
    root.setProperty('--minimap-x', `${Math.round(env.minimap.x * W)}px`);
    root.setProperty('--minimap-y', `${Math.round(env.minimap.y * H)}px`);
    root.setProperty('--minimap-w', `${Math.round(env.minimap.w * W)}px`);
    root.setProperty('--minimap-h', `${Math.round(env.minimap.h * H)}px`);
  }
  if (env.uiScale !== undefined) setUserScale(env.uiScale);
}

/** Démarre l'échelle, l'environnement GTA (zone sûre, mini-carte) et le pont manette. À appeler une fois dans main.ts. */
export function initSiku(): () => void {
  const stopScale = applyScale();
  const stopEnv = onNuiMessage<GtaEnv>('siku:env', applyEnv);
  const stopInput = initInput();
  return () => { stopScale(); stopEnv(); stopInput(); };
}
