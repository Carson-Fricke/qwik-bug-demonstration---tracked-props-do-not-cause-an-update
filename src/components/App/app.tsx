import { component$, Resource, ResourceReturn, useResource$, useStore } from '@builder.io/qwik';


export interface Comp1Props {
  a: number;
}

export interface Comp2Props {
    a?: number;
}

export async function double_it(arg: number) : Promise<number> {
  return arg * 2;
}



export const Comp1 = component$((props: Comp1Props) => {

  const resource1: ResourceReturn<number> = useResource$(async (ctx) => {
    ctx.track(() => props.a);

    console.log("Comp1 use resource run");

    return await double_it(props.a);

  });

  return (
    <Resource
        value={resource1}
        onPending={() => <>pending...</>}
        onRejected={() => <>rejected...</>}
        onResolved={(aa: number) => <>{aa}</>}
    />);
});

export const Comp2 = component$(({ a=0 }: Comp2Props) => {

  const resource1: ResourceReturn<number> = useResource$(async (ctx) => {
    ctx.track(() => a);

    console.log("Comp2 use resource run");

    return await double_it(a);

  });

  return (
    <Resource
        value={resource1}
        onPending={() => <>pending...</>}
        onRejected={() => <>rejected...</>}
        onResolved={(aa: number) => <>{aa}</>}
    />);
});


export default component$(() => {

  let store1 = useStore({
    s1: 10
  });

  return <>
    <input
        type='range' 
        min='0' max='100'
        value={store1.s1}
        onInput$={(ev) => (store1.s1 = parseInt((ev.target as HTMLInputElement).value))}      
      />
    <br/> Component without default props:
    <Comp1 a={store1.s1}/>
    <br/>Component with default props:
    <Comp2 a={store1.s1}/>
  </>;
});
