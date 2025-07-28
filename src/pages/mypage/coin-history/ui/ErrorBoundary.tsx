interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export function ErrorBoundary({ children, fallback }: ErrorBoundaryProps) {
  try {
    return <>{children}</>;
  } catch {
    return (
      <>{fallback || <p>코인 정보를 불러오지 못했습니다.</p>}</>
    );
  }
} 