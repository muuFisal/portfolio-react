import { Link } from "react-router-dom";
import Container from "../components/layout/Container";
import Button from "../components/ui/Button";

export default function NotFound() {
  return (
    <div className="py-20">
      <Container>
        <div className="rounded-2xl border border-slate-200 p-10 text-center dark:border-slate-800">
          <h1 className="text-3xl font-extrabold">404</h1>
          <p className="mt-2 text-slate-600 dark:text-slate-300">Page not found</p>
          <div className="mt-6">
            <Link to="/"><Button>Go Home</Button></Link>
          </div>
        </div>
      </Container>
    </div>
  );
}
