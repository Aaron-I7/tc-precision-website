export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content?: string;
  date: string;
  category: string;
  tags: string[];
  coverImage: string;
  readTime: string;
}

export interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: string[];
  link?: string;
  github?: string;
}

export const blogConfig = {
  name: "Aaron-腾昌精密",
  role: "全栈开发者 & 产品设计师",
  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix",
  description: "热爱代码，专注于构建优雅的用户体验。在这里分享我的技术见解、项目经验和生活思考。",
  social: {
    github: "https://github.com",
    twitter: "https://twitter.com",
    email: "mailto:zhangsan@example.com",
    juejin: "https://juejin.cn"
  },
  nav: [
    { label: "首页", path: "/" },
    { label: "文章", path: "/articles" },
    { label: "项目", path: "/projects" },
    { label: "关于", path: "/about" }
  ]
};

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "构建高性能 React 应用的 5 个技巧",
    excerpt: "在大型应用中，性能优化是必不可少的环节。本文将介绍 memo、useCallback、虚拟列表等实用技巧，助你打造丝滑体验。",
    date: "2024-05-20",
    category: "前端开发",
    tags: ["React", "Performance", "JavaScript"],
    coverImage: "https://picsum.photos/seed/react/800/400",
    readTime: "8 min read"
  },
  {
    id: 2,
    title: "深入浅出 Spring Boot 自动配置原理",
    excerpt: "Spring Boot 的魔法核心在于自动配置。通过分析 @EnableAutoConfiguration 源码，我们来揭开它的神秘面纱。",
    date: "2024-06-15",
    category: "后端技术",
    tags: ["Spring Boot", "Java", "Source Code"],
    coverImage: "https://picsum.photos/seed/spring/800/400",
    readTime: "12 min read"
  },
  {
    id: 3,
    title: "现代 CSS：Tailwind 与 CSS-in-JS 的抉择",
    excerpt: "原子化 CSS 正在改变我们写样式的方式。Tailwind CSS 到底好在哪里？它与 Styled Components 有何不同？",
    date: "2024-07-01",
    category: "前端开发",
    tags: ["CSS", "Tailwind", "Design System"],
    coverImage: "https://picsum.photos/seed/css/800/400",
    readTime: "6 min read"
  },
  {
    id: 4,
    title: "Docker 容器化部署实战指南",
    excerpt: "从编写 Dockerfile 到使用 Docker Compose 编排服务，一步步教你如何将全栈应用容器化并部署到云服务器。",
    date: "2024-08-10",
    category: "DevOps",
    tags: ["Docker", "Deployment", "Linux"],
    coverImage: "https://picsum.photos/seed/docker/800/400",
    readTime: "10 min read"
  },
  {
    id: 5,
    title: "微服务架构下的分布式事务解决方案",
    excerpt: "在微服务拆分后，如何保证数据的一致性？本文对比了 2PC、TCC、Saga 和本地消息表等常见方案。",
    date: "2024-09-05",
    category: "架构设计",
    tags: ["Microservices", "Architecture", "Database"],
    coverImage: "https://picsum.photos/seed/arch/800/400",
    readTime: "15 min read"
  }
];

export const projects: Project[] = [
  {
    id: 1,
    title: "TC-Admin 企业级管理后台",
    description: "基于 React + Spring Boot 开发的现代化企业管理系统，包含权限管理、数据可视化、动态表单等功能。",
    image: "https://picsum.photos/seed/admin/600/400",
    tags: ["React", "TypeScript", "Ant Design"],
    link: "#",
    github: "#"
  },
  {
    id: 2,
    title: "E-Commerce Next 移动电商",
    description: "高性能的移动端电商 Web App，支持 PWA，拥有流畅的动画和极致的加载速度。",
    image: "https://picsum.photos/seed/shop/600/400",
    tags: ["Next.js", "Tailwind", "PWA"],
    link: "#",
    github: "#"
  },
  {
    id: 3,
    title: "DevTools Helper 浏览器插件",
    description: "一款帮助开发者快速调试 API 和查看页面性能指标的 Chrome 扩展程序。",
    image: "https://picsum.photos/seed/tool/600/400",
    tags: ["Chrome Extension", "JavaScript"],
    link: "#",
    github: "#"
  }
];
