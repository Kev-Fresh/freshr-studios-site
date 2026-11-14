export default function FilmGrain({ opacity = 0.05 }) {
  return (
    <div
      aria-hidden="true"
      className="film-grain"
      style={{ opacity }}
    />
  )
}
