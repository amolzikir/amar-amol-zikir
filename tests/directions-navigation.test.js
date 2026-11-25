import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
const html=readFileSync(new URL("../index.html",import.meta.url),"utf8");
test("route planner menu and fields",()=>{assert.match(html,/id="openDirections"[^>]*>🧭 যাতায়াতের রুট/);assert.match(html,/id="routeOrigin"[^>]*maxlength="180"/);assert.match(html,/id="routeDestination"[^>]*maxlength="180"/);assert.match(html,/id="directionsPanel"/)});
test("current location requires explicit action and manual fallback",()=>{assert.match(html,/id="useCurrentLocation"/);assert.match(html,/navigator\.geolocation\.getCurrentPosition/);assert.match(html,/শুরুর স্থান লিখুন অথবা বর্তমান লোকেশন নিন/);assert.match(html,/delete origin\.dataset\.coordinates/)});
test("Google Maps supports driving, walking and transit",()=>{assert.match(html,/function buildDirectionsUrl\(origin,destination,mode\)/);assert.match(html,/\["driving","walking","transit"\]/);assert.match(html,/https:\/\/www\.google\.com\/maps\/dir\/\?/);assert.match(html,/new URLSearchParams\(\{api:"1",origin,destination,travelmode:travelMode\}\)/);assert.match(html,/target="_blank";link\.rel="noopener noreferrer"/)});
test("route code does not persist trip data",()=>{const start=html.indexOf("function buildDirectionsUrl("),end=html.indexOf('$("homeMenuBtn").addEventListener("click"',start);assert.doesNotMatch(html.slice(start,end),/localStorage|putItem|syncCloud|firestore/i)});
