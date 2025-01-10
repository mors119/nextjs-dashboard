import type { NextConfig } from 'next';

// 실험적 기능을 사용하려면 next최신 버전이나 canary버전이 필요할 수 있다.
// npm install next@canary
const nextConfig: NextConfig = {
  /* config options here */
  // 부분 사전 렌더링 구현
  // incremental:  특정 경로에 PPR을 채택 할 수 있다.
  experimental: {
    ppr: 'incremental',
  },
};

export default nextConfig;
