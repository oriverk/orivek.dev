<script lang="ts">
import Dialog from "@/components/ui/Dialog.svelte";
import SearchIcon from "./SearchIcon.svelte";
import Search from "./index.svelte";

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
  <div class="content">
    <SearchIcon size="small" />
    <span>Search</span>
    <span class="sr-only">posts</span>
  </div>
</button>
<Dialog bind:dialog on:closeDialog={closeDialog} id="search-dialog">
  <Search />
</Dialog>

<style>
button {
  padding: .15rem;
  background: rgba(0 0 0 / 0.3);
  background-position: 100%;
  transition: background-position 600ms var(--cubic-bezier), background-color 600ms var(--cubic-bezier);
  border-radius: .5rem;

  & > .content {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: .5rem;
    background: rgba(0 0 0 / 0.3);
    border-radius: .3rem;
    padding-inline: .5rem;

    & > span {
      color:gray;
      line-height: 2rem;
      font-size: 1.1rem;
      transition: color 600ms var(--cubic-bezier);
    }
  }
}

button:is(:hover, :focus-within) {
  background: var(--accent-gradient);
  background-position: 0;
  background-size: 400%;

  & > .content {
    background-color: rgb(var(--color-hover));

    & > span {
      color: white;
    }
  }
}
</style>
