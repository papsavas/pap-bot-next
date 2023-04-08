export const metadata = {
  title: "PAP-bot",
  //TODO!: fix
  icon: "/papboticon.png",
  description: "PAPbot dashboard",
  viewport: {
    width: "device-width",
    initScale: 1,
  },
};

export default function Home() {
  return <h1 className="text-5xl">PAPbot</h1>;
}
