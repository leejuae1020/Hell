import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import Router from "./shared/Router"; // Router import

const queryClient = new QueryClient();

function App() {
  return (
    // 페이지 구성을 Router에서 관리(왜? 가장 상위 컴포넌트니까)
    <QueryClientProvider client={queryClient}>
      <Router />
    </QueryClientProvider>
  );
}

export default App;
