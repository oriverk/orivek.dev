<script lang="ts">
import Search from "./index.svelte";
import Dialog from "@/components/ui/Dialog.svelte";
import SearchIcon from "./SearchIcon.svelte"

let dialog: HTMLDialogElement;
function openDialog() {
  dialog.showModal();
  dialog.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      dialog?.close();
    }
  });

  dialog.addEventListener("click", (e) => {
    if (e.target === dialog) {
      dialog?.close();
    }
  });
}

function closeDialog() {
  dialog.close();
}
</script>

<button type="button" on:click={openDialog} title="Search">
  <SearchIcon size="medium" />
  <span class="sr-only">Search</span>
</button>
<Dialog bind:dialog on:closeDialog={closeDialog} id="search-dialog">
  <Search />
</Dialog>

<style>
button {
  width: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  aspect-ratio: 1;
  border-radius: 0.5rem;
  transition: background-color 100ms ease-in;
  background-color: rgb(var(--color-hover));

  &:hover {
    background-color: rgba(0 0 0 / 0.3);
  }
}
</style>
