import React from 'react';
import { assetUrl } from './assets';

export function BotanicalAccent() {
  return <svg className="photo-botanical" viewBox="0 0 180 320" fill="none" aria-hidden="true">
    <path className="botanical-stem" d="M145 310 C132 245 92 194 92 128 C91 84 69 45 60 12" />
    <g className="botanical-leaves">
      <path d="M92 127 C52 101 41 58 60 12 C85 48 99 84 92 127Z" />
      <path d="M96 171 C54 157 27 127 17 88 C62 98 85 128 96 171Z" />
      <path d="M109 215 C65 208 36 184 21 145 C65 150 98 178 109 215Z" />
      <path d="M130 261 C83 265 47 246 28 213 C73 212 111 232 130 261Z" />
      <path d="M94 156 C96 109 116 77 148 58 C153 100 132 134 94 156Z" />
      <path d="M103 201 C110 163 133 138 166 126 C162 160 140 188 103 201Z" />
      <path d="M123 247 C130 214 145 197 177 189 C171 221 154 239 123 247Z" />
    </g>
    <g className="botanical-stem"><path d="M92 127 60 12 M96 171 17 88 M109 215 21 145 M130 261 28 213 M94 156 148 58 M103 201 166 126 M123 247 177 189" /></g>
  </svg>;
}

export function PhotoComposition({ src, alt, className = '', caption, preserve = false }) {
  return <figure className={`photo-composition ${preserve ? 'photo-document' : ''} ${className}`}>
    <BotanicalAccent />
    <div className="photo-window"><img src={assetUrl(src)} alt={alt} /></div>
    {caption && <figcaption className="photo-caption">{caption}</figcaption>}
  </figure>;
}
