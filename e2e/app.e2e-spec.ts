import { DakineStrainGamePage } from './app.po';

describe('dakine-strain-game App', () => {
  let page: DakineStrainGamePage;

  beforeEach(() => {
    page = new DakineStrainGamePage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
