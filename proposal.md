Members: Andrew Hand

My proposal is to create a interactive display for Magic the Gathering Deckbuilders that has the following criteria:
- A page to make and edit decklists
- A page that shows that stats of a created deck using D3 visuals
  * mana curve
  * color percentage
- Each card in the deck will have the legacy text, mana cost, and other metadata pulled from the offical MtG dB via the Gather API
  * A http crawler will also be used to scrape any info not in the dB, such as the price of a card (TCG market price)
- The application will have cookie based sessions that require user authenication.
