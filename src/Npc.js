import { npcDialogues } from "./npcDialogues.js";
import { showDialogue } from "./utils.js";

class Npc extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, texture, path) {
    super(scene, x, y, texture);
    scene.physics.world.enable(this);
    scene.add.existing(this);
    this.isTalking = false;
    this.path = path;
    this.currentPathIndex = 0;
    this.npcName = texture;
    this.name = "Npc";

    if (!texture.includes("guard")) {
      this.animationNames = {
        walkLeft: `${texture}_walk_left`,
        walkRight: `${texture}_walk_right`,
        walkUp: `${texture}_walk_up`,
        walkDown: `${texture}_walk_down`,
        walkStay: `${texture}_walk_stay`,
      };
    }

    this.body.setSize(5, 5);

    scene.physics.world.enable(this);
    this.setImmovable(true);
  }

  update() {
    if (!this.isTalking && !this.npcName.includes("guard")) {
      this.followPath();
    }
  }

  followPath() {
    if (this.currentPathIndex < this.path.length) {
      const targetX = this.path[this.currentPathIndex].x;
      const targetY = this.path[this.currentPathIndex].y;

      const angle = Phaser.Math.Angle.Between(this.x, this.y, targetX, targetY);
      const speed = 50;
      this.setVelocityX(Math.cos(angle) * speed);
      this.setVelocityY(Math.sin(angle) * speed);

      if (Math.abs(this.body.velocity.x) > Math.abs(this.body.velocity.y)) {
        if (this.body.velocity.x < 0) {
          this.anims.play(this.animationNames.walkLeft, true);
        } else {
          this.anims.play(this.animationNames.walkRight, true);
        }
      } else {
        if (this.body.velocity.y < 0) {
          this.anims.play(this.animationNames.walkUp, true);
        } else {
          this.anims.play(this.animationNames.walkDown, true);
        }
      }
      // Vérifier si le NPC est proche de la position cible
      const distance = Phaser.Math.Distance.Between(
        this.x,
        this.y,
        targetX,
        targetY
      );
      if (distance < 5 && !this.npcName.includes("guard")) {
        this.currentPathIndex++; // Passer à la prochaine position du trajet
        if (this.currentPathIndex >= this.path.length) {
          this.currentPathIndex = 0; // Revenir au début du trajet
        }
      }
    }
  }

  stop() {
    this.setVelocity(0, 0);
    this.anims.stop();
  }

  interact() {
    if (!this.isTalking) {
      this.stop();
      this.isTalking = true;
  
      // Get the current NPC's texture key
      const npcTextureKey = this.texture.key;
  
      // Check if the NPC texture key exists in the mapping
      if (npcDialogues.hasOwnProperty(npcTextureKey)) {
        // Show the dialogue for the current NPC
        showDialogue(this, npcDialogues[npcTextureKey], "npc");
      }
    }
  }
}

export default Npc;
