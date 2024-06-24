import Image from "next/image";
import { Button } from "@repo/ui/button";
import styles from "./page.module.css";
import { Player } from "@repo/ui/player";

export default function Home() {
  return (
    <div>
      <Player />
    </div>
  );
}
