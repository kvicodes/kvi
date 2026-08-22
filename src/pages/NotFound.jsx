import Button from '../components/Button.jsx'

export default function NotFound() {
  return (
    <section className="mx-auto flex min-h-[60vh] max-w-xl flex-col items-center justify-center px-6 text-center">
      <p className="font-heading text-6xl font-bold text-forest-700">404</p>
      <h1 className="mt-4 font-heading text-2xl font-bold text-forest-950">Page not found</h1>
      <p className="mt-3 text-base text-forest-800/75">
        The page you're looking for doesn't exist or may have moved.
      </p>
      <div className="mt-8">
        <Button to="/">Back to Home</Button>
      </div>
    </section>
  )
}
