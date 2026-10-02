"""DepMap 세포주 mutation CSV에서 볼 만한 변이만 추린다.

사용법: python scripts/filter_mutations.py SKOV3=path/to/SKOV3_mutations.csv RMG-I=path/to/RMGI_mutations.csv
결과는 화면에 출력하고 results/mutations_filtered.csv 로 저장한다.
"""
import sys
from pathlib import Path

import pandas as pd

DRIVERS = [
    "TP53", "KRAS", "BRAF", "NRAS", "PIK3CA", "PIK3R1", "PTEN", "AKT1",
    "ARID1A", "ARID1B", "SMARCA4", "CTNNB1", "BRCA1", "BRCA2", "ATM", "CDK12",
    "ERBB2", "CDKN2A", "RB1", "NF1", "FBXW7", "PPP2R1A", "KMT2C", "KMT2D",
    "MLH1", "MSH2", "MSH6", "PMS2", "CCNE1", "MYC",
]
FLAGS = ["Hotspot", "Oncogene High Impact", "Tumor Suppressor High Impact", "Hess Driver"]
COLS = ["Gene", "Protein Change", "Variant Info", "Allele Fraction", "Likely LOF",
        *FLAGS, "AM class"]


def is_true(s):
    return s.astype(str).str.lower() == "true"


def filter_one(label, path):
    d = pd.read_csv(path, low_memory=False)
    flagged = pd.concat([is_true(d[c]) for c in FLAGS], axis=1).any(axis=1)
    keep = d["Gene"].isin(DRIVERS) | flagged
    out = d.loc[keep, COLS].copy()
    out.insert(0, "cell_line", label)
    out["in_driver_list"] = out["Gene"].isin(DRIVERS)
    print(f"\n## {label}: 전체 {len(d)}개 중 {len(out)}개")
    print(out.drop(columns="cell_line").to_string(index=False))
    return out


def main(args):
    pairs = [a.split("=", 1) for a in args]
    res = pd.concat([filter_one(label, path) for label, path in pairs])
    Path("results").mkdir(exist_ok=True)
    res.to_csv("results/mutations_filtered.csv", index=False)
    print("\n저장: results/mutations_filtered.csv")


if __name__ == "__main__":
    main(sys.argv[1:])
