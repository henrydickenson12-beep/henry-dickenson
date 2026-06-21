// Demo parent/child accounts shared between the landing-page hero login and the
// full /login flow. No real backend yet — see project memory.

export interface Child {
  id: string;
  name: string;
  avatar: string;
  age: number;
}

export interface ParentUser {
  id: string;
  name: string;
  email: string;
  children: Child[];
}

export const PARENT_ACCOUNTS: ParentUser[] = [
  {
    id: "p1",
    name: "Sarah Johnson",
    email: "sarah@teachmore.io",
    children: [
      { id: "s1", name: "Oliver", avatar: "🦊", age: 10 },
      { id: "s6", name: "Maja", avatar: "🐱", age: 6 },
    ],
  },
  {
    id: "p2",
    name: "Emma Chen",
    email: "emma@teachmore.io",
    children: [
      { id: "s2", name: "Lila", avatar: "🦋", age: 13 },
      { id: "s3", name: "Noah", avatar: "🐢", age: 11 },
    ],
  },
];

// Demo: any valid email + 4+ char password logs in; unknown emails fall back to
// the first account so the flow is always explorable.
export function findParent(email: string, pass: string): ParentUser | null {
  if (!email.includes("@") || pass.length < 4) return null;
  return (
    PARENT_ACCOUNTS.find((p) => p.email.toLowerCase() === email.toLowerCase()) ??
    PARENT_ACCOUNTS[0]
  );
}

// Key used to hand a logged-in parent from the landing hero to the /login
// child-picker step via sessionStorage.
export const PARENT_HANDOFF_KEY = "tm_parent";
