/* Textbook thematic clustering for Revision-Kinklist.
 * 187 main items (L0-L186) mapped 1:1 into 7 personalities.
 * Each personality = group of existing categories. Score = mean(0-4)/4*100.
 */
const PERSONALITIES = [
  {
    id: "sensualist",
    name: "Sensualist",
    color: "rgb(236, 72, 153)",
    description: "Erotic connection first: sex, toys, worship and being seen. High here = sensual play is your core.",
    ranges: [[0, 20], [27, 32], [181, 186]],
    categories: ["sex", "toys", "worshipping", "photography"]
  },
  {
    id: "controller",
    name: "Power Player",
    color: "rgb(147, 51, 234)",
    description: "Control and rules: orgasm control, power dynamics, protocols and everyday control. High here = D/s dynamic is your core.",
    ranges: [[21, 26], [149, 153], [154, 161], [162, 169]],
    categories: ["orgasm-control", "power-dynamics", "control-play", "psychological-edge"]
  },
  {
    id: "restraint",
    name: "Rope & Restraint",
    color: "rgb(59, 130, 246)",
    description: "Being bound, gagged and sensory-cut-off. Bondage, gags, hoods and sensory deprivation.",
    ranges: [[44, 59], [60, 71], [116, 119]],
    categories: ["bondage", "gags", "sensory-deprivation"]
  },
  {
    id: "pain",
    name: "Pain & Sensation",
    color: "rgb(239, 68, 68)",
    description: "Impact, sharp sensation and marks: spanking through caning, wax/ice/clamps, lasting marks.",
    ranges: [[72, 82], [83, 95], [145, 148]],
    categories: ["impact-play", "sensation-play", "marks"]
  },
  {
    id: "edge",
    name: "Edge & Clinical",
    color: "rgb(249, 115, 22)",
    description: "High-risk edge: medical play, electro-stimulation and breath play. High here = edge is your core.",
    ranges: [[96, 115], [120, 126], [138, 144]],
    categories: ["medical-play", "electro-stimulation", "breath-play"]
  },
  {
    id: "taboo",
    name: "Taboo & Fluids",
    color: "rgb(101, 163, 13)",
    description: "Watersports, bodily fluids and messy food play. High here = taboo/fluids are your core.",
    ranges: [[127, 134], [135, 137], [170, 171]],
    categories: ["watersports", "bodily-fluids", "food-play"]
  },
  {
    id: "fantasy",
    name: "Fantasy & Gear",
    color: "rgb(20, 184, 166)",
    description: "Roles, fantasy and kit: age/pet/master scenes, furry/pony, leather/rubber/diapers/onesies.",
    ranges: [[33, 39], [40, 43], [172, 172], [173, 180]],
    categories: ["role-play", "fantasy-play", "object-fetish", "gear"]
  }
];
const TOTAL_ITEMS = 187;

function personalityItemCount(p) {
  return p.ranges.reduce((n, [a, b]) => n + (b - a + 1), 0);
}

function computePersonalities(getValue) {
  // getValue(i) -> 0..4
  return PERSONALITIES.map(p => {
    let sum = 0, n = 0, loves = 0;
    p.ranges.forEach(([a, b]) => {
      for (let i = a; i <= b; i++) {
        const v = getValue(i) || 0;
        sum += v; n++;
        if (v === 4) loves++;
      }
    });
    const avg = n ? sum / n : 0;
    return {
      id: p.id, name: p.name, color: p.color, description: p.description,
      avg: avg, pct: Math.round(avg / 4 * 100),
      loves: loves, count: n
    };
  }).sort((a, b) => b.pct - a.pct);
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = { PERSONALITIES, TOTAL_ITEMS, computePersonalities };
}
