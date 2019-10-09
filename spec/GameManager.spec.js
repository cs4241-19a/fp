
import GameManager from '../public/scripts/gameManager';



describe('The GameManager getInstance', () =>{
  afterEach(()=>{
    GameManager._instance = null;
  });

  it('should return the same instance when getInstance is called twice', ()=>{
    // create a spy to stop gameManager from calling document

    const instance1 = GameManager.getInstance();
    const instance2 = GameManager.getInstance();
    expect(instance1).toBe(instance2);
  });
});

