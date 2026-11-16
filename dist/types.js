export const severityTone = (severity) => (severity === 'error' || severity === 'fatal' ? 'danger' : severity === 'warn' ? 'warning' : severity === 'info' ? 'info' : 'neutral');
const SEVERITY_LABELS = { trace: 'Trace', debug: 'Debug', info: 'Info', warn: 'Avertissement', error: 'Erreur', fatal: 'Fatal' };
export const severityLabel = (severity) => SEVERITY_LABELS[severity] ?? severity;
