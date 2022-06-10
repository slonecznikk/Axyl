var players = runtimeScene.getObjects( 'player' )

var Player = {

    object:         players[0],
    hasDied:        false,
    dashAtack:      false,
    jumpCount:      0,
    movement:       players[0].getBehavior( 'PlatformerObject' ),
    coyoteTime:     players[0].getBehavior( 'AdvancedJump' ),

}


function KeyPressed( key ) { return ( runtimeScene.getGame().getInputManager().isKeyPressed( key ) ) }

function SceneStart() { return ( gdjs.evtTools.runtimeScene.sceneJustBegins( runtimeScene ) ) }

if ( SceneStart() ) {

    gdjs.RuntimeScene.getOnceTrigger()

}

var input = {

    up :        38,     // runtimeScene.getVariables('input.up'),
    down :      40,     // runtimeScene.getVariables('input.down'),
    left :      37,     //runtimeScene.getVariables('input.left'),
    right :     39,     //runtimeScene.getVariables('input.right'),
    a :         88,     //runtimeScene.getVariables('input.a'),
    b :         90,     //runtimeScene.getVariables('input.b'),

}

if ( !Player.hasDied ) {

    // Movement

        //TODO:

            // [0/2] Double Jump
            // [] Groundpound.
            // [] Fixing the "Wall Slide" bug.

        // Walking

            if ( KeyPressed( input.left ) ) 
            { Player.movement.simulateLeftKey(); Player.object.flipX( true ) } // Left
        
            if ( KeyPressed( input.right ) ) 
            { Player.movement.simulateRightKey(); Player.object.flipX( false ) } // Right
            
            // Running

            if ( KeyPressed( input.b ) ) 
            { Player.movement.setMaxSpeed(175) } 
            else { Player.movement.setMaxSpeed(150) }

        // Crouching 

            if ( KeyPressed( input.down ) ) { Player.object.setAnimation(2) }

            if ( Player.object.getAnimation() == 2 )    // Setting the 
            { Player.movement.setMaxSpeed(0) }          // velocity to 0

        // Jumping

            if ( KeyPressed( input.a ) ) 
            { Player.movement.simulateJumpKey() }

            // Double Jump

            if ( Player.movement.isOnFloor() ) { Player.jumpCount = 0 }

            if ( Player.dashAtack == false && !Player.movement.isOnFloor() 
                && Player.jumpCount < 2 && KeyPressed( input.a ) && gdjs.OnceTriggers.triggerOnce() )
            { Player.movement.setCanJump( true ); Player.jumpCount + 1 }

            if ( Player.jumpCount == 2 ) { Player.movement.setJumpSpeed( 230 ) }
            else { Player.movement.setJumpSpeed( 300 ) }
        
    // Animations

        if ( !KeyPressed( input.down ) && !Player.movement.isMoving() )
        { Player.object.setAnimation(0) }

        if ( !Player.movement.isJumping() && !Player.movement.isFalling() && Player.movement.isMoving() )
        { Player.object.setAnimation(1) }

        if ( Player.movement.isJumping())
        { Player.object.setAnimation(3) }

        if ( Player.movement.isFalling())
        { Player.object.setAnimation(4) }
}