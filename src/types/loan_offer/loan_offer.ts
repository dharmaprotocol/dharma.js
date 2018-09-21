import { Dharma } from "../dharma";

export class LoanOffer {
    public static async create(dharma: Dharma): Promise<LoanOffer> {
        return new LoanOffer(dharma);
    }

    public static async load(dharma: Dharma): Promise<LoanOffer> {
        return new LoanOffer(dharma);
    }

    private constructor(private readonly dharma: Dharma) {}

    public async accept(): Promise<string> {
        return "test";
    }

    public async signAsCreditor(): Promise<void> {
        return;
    }

    public async signAsDebtor(): Promise<void> {
        return;
    }

    public toJSON(): string {
        return "json";
    }
}
