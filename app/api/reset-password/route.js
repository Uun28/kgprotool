export async function POST(req) {
  try {
    const { token, password } = await req.json();

    if (!token || !password) {
      return Response.json({ message: "Token and password are required." }, { status: 400 });
    }

    const resp = await fetch('https://minangkabau-gsm.store/resetpassword.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({ token, password }).toString(),
    });

    const data = await resp.json();
    return Response.json(data, { status: 200 });
  } catch (err) {
    return Response.json({ message: "Server error." }, { status: 500 });
  }
}
