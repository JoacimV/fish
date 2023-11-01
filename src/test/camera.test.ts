
import { mock } from 'jest-mock-extended';
import { ControlPort } from '../Scenes/controls/control-port';
import Gameplay from '../Scenes/game';
import { IPhysicsObject, PhysicsPort } from '../Scenes/game-engine/ports/physics-port';
import { CameraPort } from '../Scenes/game-engine/ports/camera-port';

describe('gameplay', () => {
    it('should be tested', () => {
        const cameraPort = mock<CameraPort>();
        const controlPort = mock<ControlPort>();
        const physicsPort = mock<PhysicsPort>();
        const physicsObject = mock<IPhysicsObject>();
        physicsPort.create.mockReturnValue(physicsObject);
        const game = new Gameplay({ controlPort, physicsPort, cameraPort });
        expect(game).toBeDefined();
        expect(physicsPort.create).toHaveBeenCalled();
        expect(cameraPort.setBackGroundColor).toHaveBeenCalled();
    });
});


