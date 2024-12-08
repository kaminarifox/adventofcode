export function degToRad(deg) { return deg * (Math.PI / 180) };
export function sin(deg) { return Math.round(Math.sin(degToRad(deg))) };
export function cos(deg) { return Math.round(Math.cos(degToRad(deg))) };