<script lang="ts">
// @ts-ignore
import { toJpeg, toPng, toSvg } from "html-to-image";

let obj = $state({
  type: "png",
  size: 300,
  padding: 50,
  opacity: 1,
  bgColor: "transparent",
  iconColor: "",
  radius: "30% 70% 59% 41% / 30% 26% 74% 70%",
});

function handleOnChange(event: Event) {
  const target = event.target as HTMLInputElement;
  const { name, value } = target;
  // @ts-ignore
  obj[name] = value;
}

async function handleOnClick() {
  const target = document.getElementById("target");
  if(!target) return;

  const dest = document.getElementById("dest");
  dest?.querySelector("img")?.remove();

  const options = {
    pixelRatio: 1,
  };

  try {
    let dataUrl = "";
    switch (obj.type) {
      case "jpeg":
        dataUrl = await toJpeg(target, options);
        break;
      case "svg":
        dataUrl = await toSvg(target, options);
        break;
      default:
        dataUrl = await toPng(target, options);
        break;
    }

    const img = new Image();
    img.src = dataUrl;
    dest?.appendChild(img);
  } catch (error) {
    console.error("oops, something went wrong!", error);
  }
}
</script>

<div class="forms">
  <dl>
    <dt>
      <label for="size">icon-size: {obj.size}</label>
    </dt>
    <dd>
      <input type="range" name="size" min="100" max="500" step="10" bind:value={obj.size} onchange={handleOnChange} />
    </dd>
    <dt>
      <label for="padding">padding: {obj.padding}</label>
    </dt>
    <dd>
      <input type="range" name="padding" min="0" max="100" step="10" bind:value={obj.padding} onchange={handleOnChange} />
    </dd>

    <dt>
      <label for="opacity">opacity {obj.opacity}</label>
    </dt>
    <dd>
      <input type="range" name="opacity" min="0" max="1" step="0.1" bind:value={obj.opacity} onchange={handleOnChange} />
    </dd>
    <dt>
      <label for="radius">icon-radius: {obj.radius}</label>
    </dt>
    <dd>
      <input type="text" name="radius" id="" bind:value={obj.radius} onchange={handleOnChange} placeholder="50%">
    </dd>
    <dt>
      <label for="bg-color">background color: {obj.bgColor}</label>
    </dt>
    <dd>
      <input type="color" name="bgColor" bind:value={obj.bgColor} onchange={handleOnChange} /> 
    </dd>
    <dt>
      <label for="icon-color">icon color: {obj.iconColor || "favorite gradient color"}</label>
    </dt>
    <dd>
      <input type="color" name="icon-color" bind:value={obj.iconColor} onchange={handleOnChange} /> 
    </dd>
    <dt>
      <label for="img-type">img extension: {obj.type}</label>
    </dt>
    <dd>
      <select name="img-type" bind:value={obj.type} onchange={handleOnChange}>
        <option value="png">PNG</option>
        <option value="jpeg">JPEG</option>
        <option value="svg">SVG</option>
      </select>
    </dd>
  </dl>
  <button type="button" onclick={handleOnClick}>Convert to Image / SVG</button>
  <button type="button" onclick={() => location.reload()}>Reset</button>
</div>
<div class='target-container'>
  <div id='target' style={`--size: ${obj.size}px;--padding: ${obj.padding}px;--opacity: ${obj.opacity};--bg-color: ${obj.bgColor};`}>
    <div class='content' class:miku-gradient={!obj.iconColor} style={`--icon-color: ${obj.iconColor};--icon-radius: ${obj.radius};`}></div>
  </div>
</div>
<div id='dest'></div>

<style>
dt, dd {
  margin-block-end: .5rem;
}

input[type=text], select, option {
  color: black;
}

input[type="color"] {
  background: none;
}

button {
  color: white;
  padding-block: .5rem;
  padding-inline: 1rem;
  border: 1px solid transparent;
  border-radius: 0.5rem;
  transition: background-color 100ms ease-in;
  background-color: rgb(var(--color-hover));

  &:hover {
    background-color: rgba(0 0 0 / 0.3);
  }
}

.forms {
  margin-block-end: 1rem;
}

.target-container, #dest:has(> img) {
  margin-block: 1rem;
  margin-inline-end: .5rem;
  border: 1px solid white;
  display: inline-block;
}

#target {
  display: inline-block;
  padding: var(--padding);
  background-color: var(--bg-color);
  
  & > .content {
    aspect-ratio: 1 / 1;
    opacity: var(--opacity);
    width: var(--size);
    border-radius: var(--icon-radius);
    background-color: var(--icon-color);
    &.miku-gradient {
      background: var(--accent-gradient);
    }
  }
}
</style>
