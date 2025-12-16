export interface Machine {
    id: string;
    name: string;
    category: string;
    image: string;
    description: string;
    features?: string[];
    applications?: string[];
    specifications?: Record<string, any>;
}
export declare const machineryData: Machine[];
export declare const modelsByCategory: Record<string, Machine[]>;
//# sourceMappingURL=models.d.ts.map