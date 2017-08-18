export interface SpacingConfig {
	hamburger_size: number,
	hamburger_active_size: number,
}

export class RadialSpacingService {
	private spacing_radii: number[];
	constructor(private spacingConfig: SpacingConfig) {
		// set initial radius i.e the menu item
		this.spacing_radii = [spacingConfig.hamburger_active_size];
	}
	public getSpacing(number row) {
		if (spacing_radii[row]) {
			return spacing_radii[row];
		}
		const base_radii = getSpacing(row - 1);
	}
}
