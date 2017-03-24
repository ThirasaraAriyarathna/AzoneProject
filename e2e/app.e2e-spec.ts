import { AzonePage } from './app.po';

describe('azone App', () => {
  let page: AzonePage;

  beforeEach(() => {
    page = new AzonePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
