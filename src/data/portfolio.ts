import type { LucideIcon } from "lucide-react";
import {
  MapPin,
  Briefcase,
  Zap,
  Mail,
  Globe,
  AtSign,
  FileText,
} from "lucide-react";

// ============================================================
//  プロフィール（名前・肩書きなどの基本情報）
// ============================================================

export const profile = {
  name: "Maoto Mikami",
  title: "Full-Stack Developer",
  tagline: "Webで価値を創る。デザインからバックエンドまで。",
  photo: "/profile.jpg",
  about: {
    heading: "ものづくりが好きな",
    headingAccent: "フルスタックエンジニア",
    paragraphs: [
      "Webアプリケーション開発を中心に、フロントエンドからバックエンドまで一貫して手がけるエンジニアです。",
      "ユーザー体験を最優先に考え、パフォーマンスと美しさを両立したプロダクトを作ることにこだわっています。",
    ],
  },
};

// ============================================================
//  About Me のカード情報
// ============================================================

export interface InfoCard {
  icon: LucideIcon;
  label: string;
  value: string;
}

export const infoCards: InfoCard[] = [
  { icon: MapPin, label: "Location", value: "Tokyo, Japan" },
  { icon: Briefcase, label: "Experience", value: "3 Years" },
  { icon: Zap, label: "Style", value: "自走型" },
];

// ============================================================
//  作品（追加する場合はこの配列にオブジェクトを足すだけ）
// ============================================================

export interface Work {
  id: string;
  title: string;
  type: "team" | "solo";
  description: string;
  image: string;
  images?: string[];
  techs: string[];
  liveUrl?: string;
  githubUrl?: string;
  githubFrontUrl?: string;
  githubBackUrl?: string;
  planUrl?: string;
}

export const works: Work[] = [
  {
    id: "1",
    title: "Fitness App",
    type: "team",
    description:
      "スクール内でより実務に近い開発を行うために企画した,"+"\n"+
      "フィットネスジム向けの顧客管理アプリです。"+"\n"+
      "スクールスタッフを仮想クライアントとし、"+"\n"+
      "要件ヒアリングから設計・実装・納品までの"+"\n"+
      "一連のプロセスを経験することを目的としています",
    image: "/works/fitt.png",
    techs: ["React", "Spring", "Java", "TypeScript", "Tailwind CSS", "Supabase"],
    githubFrontUrl: "https://github.com/KDGT-DEVELOP-TEAM/Fitness-Gym-MG-frontend",
    githubBackUrl: "https://github.com/KDGT-DEVELOP-TEAM/Fitness-Gym-MG-backend",
    planUrl: "https://www.canva.com/design/DAG_BP2B4vY/AafdFxcDcRXZKXLOi4w_hQ/view?utm_content=DAG_BP2B4vY&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=h18a9c6d7ad#1",
  },
  {
    id: "2",
    title: "Reel Shop",
    type: "team",
    description:
      "Z世代向けリール型フリマサイト。共同開発。\n" +
      "「探す」より「出会う」をコンセプトに、\n" +
      "縦スクロールで商品が流れてくる新感覚の購買体験を設計。\n" +
      "シンプルで直感的なUI/UXにこだわりました。",
    image: "/works/Reelshop.png",
    techs: ["React", "Spring", "JWT", "Cloudinary", "Java", "TypeScript"],
    githubFrontUrl: "https://github.com/ReelShopOnlyScroll/reel-shop-frontend",
    githubBackUrl: "https://github.com/ReelShopOnlyScroll/reel-shop-backend",
    planUrl: "https://canva.link/ww6pmijmq4qp83z",
  },
  {
    id: "3",
    title: "DocuLens",
    type: "solo",
    description:
      "Google Gemini APIを使ってドキュメントを要約・質問応答できるWebアプリケーション。\n" +
      "PDF・テキスト・URL・YouTube動画を入力として受け付け、\n" +
      "Geminiによる要約生成とFAQチャットを提供する。",
    image: "/works/Docu.png",
    // スクショを追加したら "/works/Docu2.png" のように増やすだけ
    images: ["/works/Docu.png",
      "/works/Docu.png",
      
    ],
    techs: ["Next.js", "Tailwind CSS v4", "Google Gemini 2.5 Flash", "TypeScript", "React 19", "pdf-parse" ,"cheerio", "youtube-transcript", "Framer Motion"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/Pealsh/DocuLens.git",
  },
  {
    id: "4",
    title: "twitter N ",
    type: "solo",
    description:
      "専門学校1年生の時に作成したSNSアプリ。\n" +
      "アカウントの新規作成・プロフィール編集、画像付き投稿が可能。\n" +
      "いいね・返信に加え、「続きをお願い」でスレッドを伸ばして会話を続けられる。\n" +
      "通知機能でいいねや返信を把握できるタイムライン型の体験を目指した。",
    image: "/works/twitterN.png",
    techs: ["Python", "Django", "SQLite", "HTML", "CSS", "JavaScript", "Pillow", "django-widget-tweaks"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/Pealsh/twitter-N",
  },
];

// ============================================================
//  スキル（追加する場合はこの配列にオブジェクトを足すだけ）
//  - category に新しい値を追加したい場合は SkillCategory も更新する
// ============================================================

export type SkillCategory = "frontend" | "backend" | "tools";

export interface Skill {
  name: string;
  level: number;
  category: SkillCategory;
}

export const skills: Skill[] = [
  { name: "React", level: 90, category: "frontend" },
  { name: "Next.js", level: 85, category: "frontend" },
  { name: "TypeScript", level: 85, category: "frontend" },
  { name: "Tailwind CSS", level: 80, category: "frontend" },
  { name: "HTML/CSS", level: 90, category: "frontend" },
  { name: "Java", level: 40, category: "backend" },
  { name: "Spring Boot", level: 50, category: "backend" },
  { name: "Node.js", level: 75, category: "backend" },
  { name: "PostgreSQL", level: 65, category: "backend" },
  { name: "Supabase", level: 70, category: "backend" },
  { name: "Firebase", level: 65, category: "backend" },
  { name: "Git", level: 85, category: "tools" },
  { name: "Figma", level: 70, category: "tools" },
  { name: "Vercel", level: 80, category: "tools" },
];

export const skillCategories: { key: SkillCategory; label: string }[] = [
  { key: "frontend", label: "Frontend" },
  { key: "backend", label: "Backend" },
  { key: "tools", label: "Tools" },
];

export const categoryColors: Record<
  SkillCategory,
  { bar: string; text: string; glow: string; tag: string }
> = {
  frontend: {
    bar: "bg-violet-500",
    text: "text-violet-400",
    glow: "shadow-violet-500/20",
    tag: "bg-violet-500/10 text-violet-400 border-violet-500/20",
  },
  backend: {
    bar: "bg-cyan-500",
    text: "text-cyan-400",
    glow: "shadow-cyan-500/20",
    tag: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
  },
  tools: {
    bar: "bg-amber-500",
    text: "text-amber-400",
    glow: "shadow-amber-500/20",
    tag: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  },
};

// ============================================================
//  経歴（追加する場合はこの配列にオブジェクトを足すだけ）
// ============================================================

export interface CareerItem {
  year: string;
  title: string;
  description: string;
}

export const careerItems: CareerItem[] = [
  {
    year: "2021",
    title: "プログラミング学習開始",
    description: "独学でWeb開発を学び始める。HTML/CSS/JSからスタート。",
  },
  {
    year: "2023",
    title: "ドワンゴ情報工科学校 入学",
    description: "ITエンジニア育成に特化した専門校へ入学。Web開発を本格的に学び始める。",
  },
  {
    year: "2024",
    title: "○○大学 卒業 / ○○株式会社 入社",
    description: "フルスタックエンジニアとしてWebアプリ開発に従事。",
  },
  {
    year: "2025",
    title: "個人開発 & 副業開始",
    description:
      "自社サービスの開発と並行してフリーランス案件も担当。",
  },
  {
    year: "2026",
    title: "現在",
    description:
      "フルスタックエンジニアとして活動中。新しい技術を追い続ける日々。",
  },
];

// ============================================================
//  コンタクトリンク（追加する場合はこの配列にオブジェクトを足すだけ）
// ============================================================

export interface ContactLink {
  icon: LucideIcon;
  label: string;
  href: string;
  color: string;
}

export const contactLinks: ContactLink[] = [
  {
    icon: Mail,
    label: "Email",
    href: "pengutobitai@gmail.com",
    color: "hover:text-violet-400 hover:border-violet-500/30",
  },
  {
    icon: Globe,
    label: "GitHub",
    href: "https://github.com/Pealsh",
    color: "hover:text-white hover:border-zinc-500/30",
  },
  {
    icon: AtSign,
    label: "X (Twitter)",
    href: "https://x.com",
    color: "hover:text-sky-400 hover:border-sky-500/30",
  },]
