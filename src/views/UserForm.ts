import { User, UserProps } from "../modules/User";
import { View } from "./View";

export class UserForm extends View<User, UserProps> {
  
  eventsMap(): { [key: string]: () => void } {
    return {
      "click:.set-age": this.onSetAgeClick,
      "click:.set-name": this.onSetNameClick,
      "click:.set-model": this.onSaveModelClick,
    }
  }

  onSetAgeClick = (): void => {
    this.model.setRandomAge();
  }

  onSetNameClick = (): void => {
    const input = this.parent.querySelector('input') as HTMLInputElement;
    const name = input.value;
    this.model.set({ name });

    // const input = this.parent.querySelector('input');
    // if (input) {
    //   const name = input.value;
    //   this.model.set({ name });
    // }
  }

  onSaveModelClick = (): void => {
    this.model.save();
  }

  template(): string {
    return `
      <div>
        <input placeholder="${this.model.get("name")}"/>
        <button class="set-name">Change Name</button>
        <button class="set-age">Set Random age</button>
        <button class="set-model">Save</button>
      </div>
    `;
  }
}
