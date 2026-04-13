export interface TenantDto {
	name: string;
	cnpj: string;
	createdAt?: string;
	plan?: {
		name: string;
		[key: string]: any;
	};
}
