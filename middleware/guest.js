export default function ({ app, redirect }) {
  const loggedIn = app.$cookiz.get('logged-in')
  if (loggedIn) {
    return redirect('/')
  }
}
