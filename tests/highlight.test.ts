import { describe, it, expect } from 'vitest';
import { highlight, languageOf } from '../src/lib/runtime/highlight';

const types = (code: string, language: Parameters<typeof highlight>[1]) => highlight(code, language).map((line) => line.map((t) => `${t.type}:${t.text}`));

describe('highlight', () => {
  it('déduit le langage de l’extension', () => {
    expect(languageOf('studio.lua')).toBe('lua');
    expect(languageOf('mp_m_freemode_01.index.json')).toBe('json');
    expect(languageOf('server.cfg')).toBe('shell');
    expect(languageOf('README')).toBe('text');
  });
  it('json : clés, chaînes, nombres, mots-clés', () => {
    expect(types('{"a": "b", "n": 12, "ok": true}', 'json')[0]).toEqual([
      'punct:{', 'name:"a"', 'punct::', 'plain: ', 'string:"b"', 'punct:,', 'plain: ', 'name:"n"', 'punct::', 'plain: ', 'number:12', 'punct:,', 'plain: ', 'name:"ok"', 'punct::', 'plain: ', 'keyword:true', 'punct:}',
    ]);
  });
  it('lua : commentaire, mot-clé, appel, chaîne', () => {
    const [l1, l2] = types("-- note\nlocal x = Siku.log('ok')", 'lua');
    expect(l1).toEqual(['comment:-- note']);
    expect(l2).toContain('keyword:local');
    expect(l2).toContain('name:log');
    expect(l2).toContain("string:'ok'");
  });
  it('yaml : clé et commentaire, url intacte', () => {
    const [l1, l2] = types('url: http://x.y # prod\nport: 8080', 'yaml');
    expect(l1[0]).toBe('name:url');
    expect(l1).toContain('comment:# prod');
    expect(l2).toEqual(['name:port', 'punct::', 'plain: ', 'number:8080']);
  });
  it('html : balise, attribut, valeur, texte', () => {
    expect(types('<a href="/x">Go</a>', 'html')[0]).toEqual(['name:<a', 'plain: ', 'attr:href', 'punct:=', 'string:"/x"', 'punct:>', 'plain:Go', 'name:</a', 'punct:>']);
  });
  it('les commentaires multi-lignes gardent le découpage en lignes', () => {
    const rows = highlight('/* a\nb */ x', 'javascript');
    expect(rows).toHaveLength(2);
    expect(rows[0]).toEqual([{ type: 'comment', text: '/* a' }]);
    expect(rows[1][0]).toEqual({ type: 'comment', text: 'b */' });
  });
  it('texte : une ligne par ligne, sans coloration', () => {
    expect(highlight('a\n\nb', 'text')).toEqual([[{ type: 'plain', text: 'a' }], [], [{ type: 'plain', text: 'b' }]]);
  });
});
