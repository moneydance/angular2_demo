import { Component, ElementRef } from '@angular/core';
import {
	AnimationBuilder,
   	AnimationPlayer,
	AnimationFactory,
	animate,
	style
} from '@angular/animations';

const PI = 3.14;

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

	constructor(private builder: AnimationBuilder, private elRef: ElementRef) {}

	public set position(p: Position) {
		this._position = p;
		const animation: string =
			'350ms cubic-bezier(0.165, 0.840, 0.440, 1.000)';
		this.positionPlayer = this.positionPlayerFactory(p, animation, this.elRef.nativeElement);
		this.positionPlayer.play();
	}

	public resetPosition() {
		this.position = { x: 0, y: 0, z: 0 };
	}

	public calculatePosition(idx:number, distance:number) {
		const p: Position = { x:distance, y:0, z: 0 };
	}

	private positionPlayerFactory(p: Position, animation:string, el: any): AnimationPlayer {
		const factory: AnimationFactory = this.builder.build([
			style({ transform: '*' }),
			animate(
				animation,
				style({ transform: `translate3d(${p.x}px,${p.y}px,${p.z}px)` })
			)
		]);
		return factory.create(el);
	}
}
