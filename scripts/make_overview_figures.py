"""배경 공부 탭의 한눈에 보기 그림 2개를 만든다.

같은 설계에서 Claude Docs 위젯 코드(JSX, 색 토큰)와 Notion·슬라이드용 SVG(hex 색)를 함께 뽑는다.
    python scripts/make_overview_figures.py
결과: sync/ov_tumor_types.svg, sync/ov_cell_lines.svg, 그리고 위젯 코드 2개 (scratch 폴더)
"""
import json
import sys
from pathlib import Path

TOK = {
    "ink": ("var(--cds-text-primary)", "#1f1f1f"),
    "quiet": ("var(--cds-text-secondary)", "#6b6b6b"),
    "edge": ("var(--cds-chart-axis)", "#a8a89e"),
    "accent": ("var(--cds-chart-categorical-1)", "#2f6fdb"),
    "warn": ("var(--cds-chart-status-warning)", "#d97706"),
    "tint": ("var(--cds-chart-reference-tint)", "#f1f0ea"),
    "grid": ("var(--cds-chart-grid)", "#e4e3dc"),
    "none": ("none", "none"),
}
FONT = "-apple-system, 'Segoe UI', 'Apple SD Gothic Neo', 'Malgun Gothic', sans-serif"


class Fig:
    def __init__(self, w, h, title):
        self.w, self.h, self.title = w, h, title
        self.items = []  # ("g", anchor, [items]) or primitives

    def group(self, anchor):
        g = ("g", anchor, [])
        self.items.append(g)
        return g[2]

    @staticmethod
    def rect(x, y, w, h, stroke="edge", fill="none", op=None, dash=False, sw=1.25, rx=8):
        return ("rect", dict(x=x, y=y, w=w, h=h, stroke=stroke, fill=fill, op=op, dash=dash, sw=sw, rx=rx))

    @staticmethod
    def text(tid, x, y, words, size=13, weight=None, fill="ink", anchor="middle"):
        return ("text", dict(tid=tid, x=x, y=y, words=words, size=size, weight=weight, fill=fill, anchor=anchor))

    @staticmethod
    def path(d, stroke="edge", dash=False, arrow=True):
        return ("path", dict(d=d, stroke=stroke, dash=dash, arrow=arrow))

    # ---- output
    def _prim(self, p, jsx):
        kind, a = p
        c = (lambda k: TOK[k][0]) if jsx else (lambda k: TOK[k][1])
        if kind == "rect":
            if jsx:
                s = (f"<rect x='{a['x']}' y='{a['y']}' width='{a['w']}' height='{a['h']}' rx='{a['rx']}' "
                     f"fill='{c(a['fill'])}' stroke='{c(a['stroke'])}' strokeWidth='{a['sw']}'")
                if a["op"] is not None:
                    s += f" fillOpacity='{a['op']}'"
                if a["dash"]:
                    s += " strokeDasharray='4 4'"
                return s + "/>"
            s = (f'<rect x="{a["x"]}" y="{a["y"]}" width="{a["w"]}" height="{a["h"]}" rx="{a["rx"]}" '
                 f'fill="{c(a["fill"])}" stroke="{c(a["stroke"])}" stroke-width="{a["sw"]}"')
            if a["op"] is not None:
                s += f' fill-opacity="{a["op"]}"'
            if a["dash"]:
                s += ' stroke-dasharray="4 4"'
            return s + "/>"
        if kind == "text":
            w = a["words"].replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")
            if jsx:
                s = f"<text data-claude-text-id='{a['tid']}' x='{a['x']}' y='{a['y']}'"
                if a["anchor"] != "start":
                    s += f" textAnchor='{a['anchor']}'"
                s += f" fontSize='{a['size']}'"
                if a["weight"]:
                    s += f" fontWeight='{a['weight']}'"
                return s + f" fill='{c(a['fill'])}'>{w}</text>"
            s = f'<text x="{a["x"]}" y="{a["y"]}"'
            if a["anchor"] != "start":
                s += f' text-anchor="{a["anchor"]}"'
            s += f' font-size="{a["size"]}"'
            if a["weight"]:
                s += f' font-weight="{a["weight"]}"'
            return s + f' fill="{c(a["fill"])}">{w}</text>'
        if kind == "path":
            if jsx:
                s = f"<path d='{a['d']}' fill='none' stroke='{c(a['stroke'])}' strokeWidth='1.25'"
                if a["dash"]:
                    s += " strokeDasharray='4 4'"
                if a["arrow"]:
                    s += " markerEnd='url(#ovf-arrow)'"
                return s + "/>"
            s = f'<path d="{a["d"]}" fill="none" stroke="{c(a["stroke"])}" stroke-width="1.25"'
            if a["dash"]:
                s += ' stroke-dasharray="4 4"'
            if a["arrow"]:
                s += ' marker-end="url(#a)"'
            return s + "/>"
        raise ValueError(kind)

    def _body(self, jsx):
        out = []
        for it in self.items:
            if it[0] == "g":
                inner = "".join(self._prim(p, jsx) for p in it[2])
                out.append(f"<g data-claude-anchor='{it[1]}'>{inner}</g>" if jsx else f"<g>{inner}</g>")
            else:
                out.append(self._prim(it, jsx))
        return out

    def jsx(self):
        edge = TOK["edge"][0]
        marker = (f"<defs><marker id='ovf-arrow' viewBox='0 0 10 10' refX='9' refY='5' markerWidth='6' "
                  f"markerHeight='6' orient='auto-start-reverse'><path d='M0 0L10 5L0 10z' fill='{edge}'/></marker></defs>")
        return (f"export default () => <svg viewBox='0 0 {self.w} {self.h}' role='img' aria-label='{self.title}' "
                f"fontSize='13'>{marker}{''.join(self._body(True))}</svg>;")

    def svg(self):
        head = (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {self.w} {self.h}" width="{self.w}" '
                f'height="{self.h}" font-family="{FONT}" font-size="13">\n'
                f'<rect width="{self.w}" height="{self.h}" fill="#ffffff"/>\n'
                '<defs><marker id="a" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" '
                'orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" fill="#a8a89e"/></marker></defs>\n')
        return head + "\n".join(self._body(False)) + "\n</svg>\n"


R, T, P = Fig.rect, Fig.text, Fig.path


def box2(g, tid, x, y, w, h, name, sub, kind="n", sub2=None):
    """이름 + 설명 1–2줄 상자. kind: n(기본) · main(강조)."""
    if kind == "main":
        g.append(R(x, y, w, h, stroke="accent", fill="accent", op=0.12, sw=2))
    else:
        g.append(R(x, y, w, h))
    cx = x + w // 2
    lines = 1 + (sub is not None) + (sub2 is not None)
    top = y + h // 2 - (lines - 1) * 8 + 4
    g.append(T(f"{tid}-name", cx, top, name, weight=600))
    if sub is not None:
        g.append(T(f"{tid}-sub", cx, top + 17, sub, size=11.5, fill="quiet"))
    if sub2 is not None:
        g.append(T(f"{tid}-sub2", cx, top + 33, sub2, size=11.5, fill="quiet"))


def tumor_types():
    f = Fig(760, 500, "난소암의 약 90%는 상피성이고, 이 프로젝트 세포주는 모두 상피성이다")
    f.items.append(T("title", 24, 32, f.title, size=15, weight=600, anchor="start"))
    f.items.append(T("subtitle", 24, 52, "난소 종양 분류 · 비율은 악성 난소 종양 기준 대략치", size=11.5, fill="quiet", anchor="start"))

    # 상피성 (왼쪽 큰 틀)
    g = f.group("epithelial")
    g.append(R(24, 72, 440, 372, fill="tint"))
    g.append(T("epi-name", 40, 98, "Epithelial · 상피성 · 약 90%", size=14, weight=600, anchor="start"))
    g = f.group("serous")
    box2(g, "serous", 40, 116, 176, 112, "Serous", "장액성 · 70–80%", sub2="SKOV-3: 등급 미표기(SOC)")
    g = f.group("hgsoc")
    box2(g, "hgsoc", 232, 116, 216, 52, "High-grade (HGSOC)", "OVCAR-3 · OVSAHO · HeyA8", kind="main")
    g = f.group("lgsoc")
    box2(g, "lgsoc", 232, 176, 216, 52, "Low-grade (LGSOC)", "<5% · HeyA8이 문헌상 유사")
    g = f.group("endometrioid")
    box2(g, "endometrioid", 40, 244, 408, 52, "Endometrioid · 약 10%", "A2780", kind="main")
    g = f.group("clearcell")
    box2(g, "clearcell", 40, 308, 408, 52, "Clear cell · 약 10%", "OVTOKO · RMG-I · RMG-II", kind="main")
    g = f.group("mucinous")
    box2(g, "mucinous", 40, 372, 408, 52, "Mucinous · 약 3%", "이 프로젝트에 없음")
    g = f.group("serous-links")
    g.append(P("M216 172H224V142H232"))
    g.append(P("M216 172H224V202H232"))

    # 오른쪽
    g = f.group("sex-cord")
    box2(g, "sexcord", 480, 72, 256, 52, "Sex cord-stromal · 약 7%", "성삭-기질 종양")
    g = f.group("germ-cell")
    g.append(R(480, 140, 256, 236, fill="tint"))
    g.append(T("germ-name", 496, 166, "Germ cell · 생식세포 · 3–7%", size=14, weight=600, anchor="start"))
    for i, (tid, words) in enumerate([("mature", "Mature teratoma · 양성"), ("immature", "Immature teratoma · 악성"),
                                      ("dysgerminoma", "Dysgerminoma · 악성"), ("yolksac", "Yolk sac tumor · 악성")]):
        y = 180 + i * 48
        g.append(R(496, y, 224, 40))
        g.append(T(tid, 608, y + 24, words))
    g = f.group("other-rare")
    box2(g, "rare", 480, 392, 256, 52, "Other rare", "기타 희귀 종양")

    g = f.group("legend")
    g.append(R(24, 464, 16, 16, stroke="accent", fill="accent", op=0.12, sw=2, rx=4))
    g.append(T("legend-accent", 48, 477, "색칠한 상자 = 이 프로젝트 세포주가 속한 아형 (DepMap 기준)", size=11.5, fill="quiet", anchor="start"))
    return f


def cell_lines():
    f = Fig(760, 548, "HeyA8·SKOV-3는 문헌과 DepMap의 아형이 다르다")
    f.items.append(T("title", 24, 32, f.title, size=15, weight=600, anchor="start"))
    f.items.append(T("subtitle", 24, 52, "세포주 8종 · OVCAR-3는 DepMap 이름이 NIHOVCAR3, RMG-II는 DepMap 미등록",
                     size=11.5, fill="quiet", anchor="start"))
    cols = [("line", 24, 88), ("lit", 112, 136), ("dep", 248, 128), ("id", 376, 132), ("mut", 508, 228)]
    heads = {"line": "세포주", "lit": "문헌 아형", "dep": "DepMap 아형", "id": "DepMap 이름 · ID", "mut": "주요 변이"}
    y0, hh, rh = 72, 32, 48
    g = f.group("header")
    g.append(R(24, y0, 712, hh, stroke="none", fill="tint", rx=0))
    for k, x, w in cols:
        g.append(T(f"h-{k}", x + 12, y0 + 21, heads[k], size=11.5, weight=600, fill="quiet", anchor="start"))

    rows = [
        ("ovcar3", "OVCAR-3", ("HGSOC", None), ("HGSOC", None), ("NIHOVCAR3", "ACH-000001"), ("TP53 R248Q", "CCNE1 증폭"), "name"),
        ("ovsaho", "OVSAHO", ("HGSOC", None), ("HGSOC", None), ("OVSAHO", "ACH-000409"), ("TP53 변이", "RB1 결손"), None),
        ("heya8", "HeyA8", ("LGSOC 유사", "TP53 wt + MAPK"), ("HGSOC", None), ("HEYA8", "ACH-000542"), ("KRAS G12D · BRAF G464E", "TP53 wild-type"), "sub"),
        ("skov3", "SKOV-3", ("CCOC/ENOC 유사", "ARID1A + PIK3CA"), ("SOC", "장액성, 등급 미표기"), ("SKOV3", "ACH-000811"), ("PIK3CA H1047R · ARID1A Q586*", "TP53 null · ERBB2 증폭"), "sub"),
        ("a2780", "A2780", ("Endometrioid", None), ("EOV", "Endometrioid"), ("A2780", "ACH-000657"), ("ARID1A · PIK3CA · PTEN", "MMR 결핍 · TP53 wild-type"), None),
        ("ovtoko", "OVTOKO", ("Clear cell", None), ("CCOV", "Clear cell"), ("OVTOKO", "ACH-000663"), ("ARID1A", None), None),
        ("rmg1", "RMG-I", ("Clear cell", None), ("CCOV", "Clear cell"), ("RMGI", "ACH-000719"), ("TERT promoter · FANCL W57*", "ARID1A wild-type"), None),
        ("rmg2", "RMG-II", ("Clear cell", None), None, None, ("MLH1 (문헌)", None), "missing"),
    ]
    for i, (rid, name, lit, dep, did, mut, flag) in enumerate(rows):
        y = y0 + hh + i * rh
        g = f.group(f"row-{rid}")
        g.append(P(f"M24 {y + rh}H736", stroke="grid", arrow=False))
        mid = y + rh // 2

        def cell(key, x, w, pair, fill_kind=None, bold_first=False):
            if fill_kind == "warn":
                g.append(R(x + 4, y + 5, w - 8, rh - 10, stroke="warn", fill="warn", op=0.14, sw=1.5, rx=6))
            if fill_kind == "accent":
                g.append(R(x + 4, y + 5, w - 8, rh - 10, stroke="accent", fill="accent", op=0.10, sw=1.5, rx=6))
            first, second = pair
            if second is None:
                g.append(T(f"{rid}-{key}", x + 12, mid + 4, first, weight=600 if bold_first else None, anchor="start"))
            else:
                g.append(T(f"{rid}-{key}", x + 12, mid - 3, first, weight=600 if bold_first else None, anchor="start"))
                g.append(T(f"{rid}-{key}-2", x + 12, mid + 13, second, size=11.5, fill="quiet", anchor="start"))

        cell("line", 24, 88, (name, None), bold_first=True)
        cell("lit", 112, 136, lit, fill_kind="warn" if flag == "sub" else None)
        if flag == "missing":
            g.append(R(252, y + 5, 252, rh - 10, stroke="edge", fill="none", dash=True, rx=6))
            g.append(T(f"{rid}-dep", 378, mid + 4, "DepMap 미등록 · CCLE 데이터 없음", fill="quiet"))
        else:
            cell("dep", 248, 128, dep, fill_kind="warn" if flag == "sub" else None)
            cell("id", 376, 132, did, fill_kind="accent" if flag == "name" else None, bold_first=flag == "name")
        cell("mut", 508, 228, mut)

    ly = 72 + 32 + 8 * 48 + 22
    g = f.group("legend")
    g.append(R(24, ly, 16, 16, stroke="warn", fill="warn", op=0.14, sw=1.5, rx=4))
    g.append(T("legend-warn", 46, ly + 13, "문헌과 DepMap 아형이 다름", size=11.5, fill="quiet", anchor="start"))
    g.append(R(232, ly, 16, 16, stroke="accent", fill="accent", op=0.10, sw=1.5, rx=4))
    g.append(T("legend-name", 254, ly + 13, "DepMap 이름이 다름 (검색은 NIHOVCAR3)", size=11.5, fill="quiet", anchor="start"))
    g.append(R(508, ly, 16, 16, stroke="edge", fill="none", dash=True, rx=4))
    g.append(T("legend-missing", 530, ly + 13, "DepMap 미등록", size=11.5, fill="quiet", anchor="start"))
    return f


if __name__ == "__main__":
    root = Path(__file__).resolve().parent.parent
    scratch = Path(sys.argv[1]) if len(sys.argv) > 1 else root / "results"
    scratch.mkdir(parents=True, exist_ok=True)
    for name, fig in [("ov_tumor_types", tumor_types()), ("ov_cell_lines", cell_lines())]:
        (root / "sync" / f"{name}.svg").write_text(fig.svg(), encoding="utf-8")
        (scratch / f"{name}.jsx.json").write_text(json.dumps(fig.jsx(), ensure_ascii=False), encoding="utf-8")
        print(name, len(fig.jsx()))
