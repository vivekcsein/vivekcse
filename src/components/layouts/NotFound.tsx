import { Home } from "lucide-react";
import { Link } from "../ui";

const NotFound = () => {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-6">
      <div className="text-center">
        <h1 className="text-7xl font-bold">404</h1>

        <h2 className="mt-4 text-2xl font-semibold">Page not found</h2>

        <p className="mt-2 text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>

        <Link href="/" variant="primary-button" className="mt-8">
          <Home className="h-4 w-4" />
          Back to Home
        </Link>
      </div>
    </main>
  );
};

export default NotFound;
