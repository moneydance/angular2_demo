import { Component, ElementRef } from '@angular/core';
import {
	AnimationBuilder,
   	AnimationPlayer,
	AnimationFactory,
	animate,
	style
} from '@angular/animations';

export interface Position {
	x: number;
	y: number;
	z: number;
}

@Component({
	selector: 'bp-hamburger-item',
	templateUrl: 'hamburger_item.html',
	styleUrls: ['hamburger_item.scss']
})
export class HamburgerItemComponent {
	private positionPlayer: AnimationPlayer;
	private _position: Position = { x: 0, y: 0, z: 0 };
	private animation: string = '350ms cubic-bezier(0.165, 0.840, 0.440, 1.000)';

	constructor(private builder: AnimationBuilder, private elRef: ElementRef) {}

	public set position(p: Position) {
		this._position = p;
		this.positionPlayer = this.positionPlayerFactory(
			this._position,
			this.animation,
			this.elRef.nativeElement
		);
		this.positionPlayer.play();
	}

	public resetPosition() {
		this.position = { x: 0, y: 0, z: 0 };
	}

	private positionPlayerFactory(p: Position, animation:string, el: any): AnimationPlayer {
		const factory: AnimationFactory = this.builder.build([
			style({ transform: '*' }),
			animate(
				animation,
				style({
					transform: `translate3d(${p.x}px,${p.y}px,${p.z}px)`
				})
			)
		]);
		return factory.create(el);
	}
}
