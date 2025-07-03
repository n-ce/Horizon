/* @refresh reload */
import { render } from 'solid-js/web';
import { createSignal, For } from 'solid-js';
import './style.css';

render(
  () => <App />,
  document.body.firstElementChild as HTMLDivElement
);

function App() {
  const [siblings, setSiblings] = createSignal<number[]>([]);
  let siblingCounter = 0;

  const sectionRefs: { [key: number]: HTMLDivElement | undefined } = {};

  const openNewSection = () => {
    const newId = siblingCounter++;
    setSiblings(prev => [...prev, newId]);

    sectionRefs[newId].scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const closeSection = (idToClose: number) => {
    setSiblings(prev => prev.filter(id => id !== idToClose));
    delete sectionRefs[idToClose];
  };

  return (
    <>
      <Head openNewSection={openNewSection}
      />
      <For each={siblings()}>
        {(id) => (
          <Sibling
            id={id}
            closeSection={closeSection}
            ref={(el) => (sectionRefs[id] = el as HTMLDivElement)}
          />
        )}
      </For>
    </>
  );
}

function Head(props: {
  openNewSection: () => void
}) {
  return (
    <section >
      <button onClick={props.openNewSection}>Open a new section</button>
    </section>
  );
}

function Sibling(props: {
  id: number,
  closeSection: (id: number) => void,
  ref?: (el: HTMLDivElement) => void
}
) {
  return (
    <section ref={props.ref}>
      <button onClick={() => props.closeSection(props.id)}>Close section #{props.id}</button>
    </section>
  );
}
