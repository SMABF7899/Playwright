import {expect, type Locator} from "@playwright/test";

async function highLight(element: Locator) {
    const originalStyle = await element.evaluate(el => el.getAttribute('style'));
    await element.evaluate(el => {
        (el as HTMLElement).setAttribute('style', 'background: yellow; border: 2px solid red;');
    });
    await new Promise(r => setTimeout(r, 150));
    await element.evaluate((el, style) => {
        if (style) (el as HTMLElement).setAttribute('style', style);
        else (el as HTMLElement).removeAttribute('style');
    }, originalStyle);
}

export class HighlightedLocator {
    private locator: Locator;

    constructor(locator: Locator) {
        this.locator = locator;
    }

    async fill(value: string) {
        await highLight(this.locator);
        await this.locator.fill(value);
    }

    async click() {
        await highLight(this.locator);
        await this.locator.click();
    }

    async toHaveValue(value: string) {
        await highLight(this.locator);
        await expect(this.locator).toHaveValue(value);
    }

    async toHaveText(test: string) {
        await highLight(this.locator);
        await expect(this.locator).toHaveText(test);
    }
}
