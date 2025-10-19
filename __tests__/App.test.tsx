import React from "react";
import renderer, { act } from "react-test-renderer";
import App from "../src/App";

describe("App Component", () => {
  it("deve renderizar a tela de Login", async () => {
    let tree: renderer.ReactTestRenderer | undefined;
    await act(async () => {
      tree = renderer.create(<App />);
    });
    const instance = tree!.root;

    expect(instance.findByProps({ children: "Fazer Login" })).toBeTruthy();
  });
});
