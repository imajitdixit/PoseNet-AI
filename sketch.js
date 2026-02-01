let capture;
let posenet;
let singlePose, skeleton;

function setup() {
  const canvas = createCanvas(800, 500);
  canvas.parent("canvasContainer");

  // Auto start camera
  capture = createCapture(VIDEO);
  capture.size(800, 500);
  capture.hide();

  posenet = ml5.poseNet(capture, modelLoaded);
  posenet.on("pose", receivedPoses);
}

function modelLoaded() {
  console.log("Model has loaded ✅");
  if (window.setStatus) window.setStatus("Model Loaded. Pose Detection Started");
}

function receivedPoses(poses) {
  if (poses.length > 0) {
    singlePose = poses[0].pose;
    skeleton = poses[0].skeleton;
  }
}

function draw() {
  background(0);
  image(capture, 0, 0);

  if (singlePose) {
    fill(255, 0, 0);
    noStroke();

    for (let i = 0; i < singlePose.keypoints.length; i++) {
      ellipse(
        singlePose.keypoints[i].position.x,
        singlePose.keypoints[i].position.y,
        14
      );
    }

    stroke(255);
    strokeWeight(4);

    for (let j = 0; j < skeleton.length; j++) {
      line(
        skeleton[j][0].position.x,
        skeleton[j][0].position.y,
        skeleton[j][1].position.x,
        skeleton[j][1].position.y
      );
    }
  }
}
