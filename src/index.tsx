/* @refresh reload */
import { render } from 'solid-js/web';
import { createSignal, Show } from 'solid-js';
import './style.css';

render(
  () => <App />,
  document.body.firstElementChild as HTMLDivElement
);

function Sibling1(props) {
  return (
    <section ref={props.ref}>
      <button onClick={() => props.closeSection(props.id)}>Close Sibling 1</button>
    </section>
  );
}

function Sibling2(props) {
  return (
    <section ref={props.ref}>
      <button onClick={() => props.closeSection(props.id)}>Close Sibling 2</button>
    </section>
  );
}

function App() {
  const [activeSiblingIds, setActiveSiblingIds] = createSignal([]);
  const sectionRefs = {};
  let headRef: HTMLDivElement;

  const openSibling = (idToOpen) => {
    if (!activeSiblingIds().includes(idToOpen))
      setActiveSiblingIds(prev => [...prev, idToOpen]);

    sectionRefs[idToOpen].scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  };

  const closeSection = async (idToClose) => {
    headRef.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });

    setTimeout(() => {
      setActiveSiblingIds(prev => prev.filter(id => id !== idToClose).sort((a, b) => a - b));
      delete sectionRefs[idToClose];
    }, 500);
  };

  return (
    <>
      <Head openSibling={openSibling} ref={(el) => (headRef = el)} />

      <Show when={activeSiblingIds().includes(1)}>
        <Sibling1 id={1} closeSection={closeSection} ref={(el) => (sectionRefs[1] = el)} />
      </Show>
      <Show when={activeSiblingIds().includes(2)}>
        <Sibling2 id={2} closeSection={closeSection} ref={(el) => (sectionRefs[2] = el)} />
      </Show>
    </>
  );
}

function Head(props) {
  return (
    <section ref={props.ref}>
      <button onClick={() => props.openSibling(1)}>Open Sibling 1</button>
      <button onClick={() => props.openSibling(2)}>Open Sibling 2</button>
    </section>
  );
}
