function clas () {
    class MenuCard {
        constructor(src, alt, title, desc, price, parentSelector) {
          this.src = src;
          this.alt = alt;
          this.title = title;
          this.desc = desc;
          this.price = price;
          this.parent = document.querySelector(parentSelector);
          this.transfer = 11000;
          this.changeToUZS();
        }
    
        changeToUZS() {
          this.price = this.price * this.transfer;
        }
    
        render() {
          const element = document.createElement("div");
    
          element.innerHTML = `
          <div class="menu__item">
            <img src=${this.src} alt=${this.alt} />
            <h3 class="menu__item-subtitle">${this.title}</h3>
            <div class="menu__item-descr">
              ${this.desc}
            </div>
            <div class="menu__item-divider"></div>
            <div class="menu__item-price">
              <div class="menu__item-cost">Price:</div>
              <div class="menu__item-total"><span>${this.price}</span>so'm/month</div>
            </div>
         </div>
          `;
          this.parent.append(element);
        }
      }
    
      const getResource = async (url) => {
        const res = await fetch(url);
    
        return await res.json();
      };
    
      getResource("http://localhost:3000/menu").then((data) => {
        data.forEach(({ img, alt, title, desc, price }) => {
          new MenuCard(img, alt, title, desc, price, ".menu .container").render();
        });
      });
}

export default clas