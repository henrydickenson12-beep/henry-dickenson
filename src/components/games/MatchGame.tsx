"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getPairs, MatchPair } from "@/lib/matchPairs";
import { saveScore } from "@/lib/scores";

interface Card { id: number; value: string; pairId: number; side: "left" | "right"; flipped: boolean; matched: boolean; }

interface Props {
  subject: string;
  level: string;
  color: string;
  bg: string;
  onFinish: (score: number, total: number) => void;
}

function shuffle<T>(arr: T[]): T[] { return [...arr].sort(() => Math.random() - 0.5); }

export default function MatchGame({ subject, level, color, bg, onFinish }: Props) {
  const [cards, setCards] = useState<Card[]>([]);
  const [selected, setSelected] = useState<number[]>([]);
  const [matched, setMatched] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [finished, setFinished] = useState(false);
  const [wrong, setWrong] = useState<number[]>([]);
  const [startTime] = useState(() => Date.now());
  const [elapsed, setElapsed] = useState(0);

  const pairs = getPairs(subject, level);
  const total = pairs.length;

  useEffect(() => {
    const allCards: Card[] = [];
    pairs.forEach((p: MatchPair, i: number) => {
      allCards.push({ id: i * 2, value: p.left, pairId: i, side: "left", flipped: false, matched: false });
      allCards.push({ id: i * 2 + 1, value: p.right, pairId: i, side: "right", flipped: false, matched: false });
    });
    setCards(shuffle(allCards));
  }, [subject, level]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (finished) return;
    const t = setInterval(() => setElapsed(Math.floor((Date.now() - startTime) / 1000)), 500);
    return () => clearInterval(t);
  }, [finished, startTime]);

  const handleFinish = useCallback((matchedCount: number) => {
    setFinished(true);
    saveScore({ subject, gameType: "match", score: matchedCount, total, level });
    onFinish(matchedCount, total);
  }, [subject, total, level, onFinish]);

  function flip(id: number) {
    if (selected.length >= 2) return;
    if (matched.includes(id) || selected.includes(id)) return;

    const next = [...selected, id];
    setSelected(next);

    if (next.length === 2) {
      setMoves((m) => m + 1);
      const [a, b] = next.map((i) => cards.find((c) => c.id === i)!);
      if (a.pairId === b.pairId && a.side !== b.side) {
        // Match!
        const newMatched = [...matched, a.id, b.id];
        setMatched(newMatched);
        setSelected([]);
        if (newMatched.length === cards.length) {
          setTimeout(() => handleFinish(total), 600);
        }
      } else {
        setWrong(next);
        setTimeout(() => { setSelected([]); setWrong([]); }, 900);
      }
    }
  }

  const flippedIds = new Set([...selected, ...matched]);

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-6 px-1">
        <div className="font-black text-lg" style={{ color }}>
          ✅ {matched.length / 2}/{total} matched
        </div>
        <div className="font-bold text-gray-400">
          🔄 {moves} moves · ⏱️ {elapsed}s
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {cards.map((card) => {
          const isFlipped = flippedIds.has(card.id);
          const isMatched = matched.includes(card.id);
          const isWrong = wrong.includes(card.id);

          return (
            <motion.button
              key={card.id}
              onClick={() => !isFlipped && flip(card.id)}
              disabled={isFlipped}
              whileHover={!isFlipped ? { scale: 1.04, y: -2 } : {}}
              whileTap={!isFlipped ? { scale: 0.97 } : {}}
              animate={{
                scale: isMatched ? [1, 1.1, 1] : isWrong ? [1, 1.04, 0.97, 1] : 1,
              }}
              transition={{ duration: 0.3 }}
              className="aspect-square rounded-2xl p-3 font-black text-center flex items-center justify-center transition-all text-sm leading-tight"
              style={{
                background: isMatched ? "#ECFDF5" : isWrong ? "#FFF1F2" : isFlipped ? "white" : bg,
                border: `2px solid ${isMatched ? "#10B981" : isWrong ? "#F43F5E" : isFlipped ? color : color + "40"}`,
                color: isFlipped ? "#1E1B4B" : "transparent",
                boxShadow: isFlipped ? "0 4px 16px rgba(0,0,0,0.08)" : "none",
                cursor: isFlipped ? "default" : "pointer",
              }}>
              <AnimatePresence mode="wait">
                {isFlipped ? (
                  <motion.span key="front" initial={{ rotateY: 90 }} animate={{ rotateY: 0 }} transition={{ duration: 0.2 }}>
                    {card.value}
                  </motion.span>
                ) : (
                  <motion.span key="back" className="text-2xl">
                    {isMatched ? "✅" : "?"}
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          );
        })}
      </div>

      {finished && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="mt-8 text-center p-6 rounded-3xl"
          style={{ background: "white", boxShadow: "0 8px 32px rgba(0,0,0,0.08)" }}>
          <div className="text-6xl mb-3">🏆</div>
          <h3 className="text-2xl font-black mb-1" style={{ color }}>All matched!</h3>
          <p className="text-gray-500">{moves} moves in {elapsed} seconds</p>
        </motion.div>
      )}
    </div>
  );
}
