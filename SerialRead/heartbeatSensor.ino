#define BAUD_RATE 115200
#define SAMPLE_RATE 500
#define BAUD_RATE 115200
#define INPUT_PIN A0

double time;

void setup() {
  // put your setup code here, to run once:
  Serial.begin(BAUD_RATE);

}

void loop() {
  // put your main code here, to run repeatedly:
  Serial.print("Signal:");
  Serial.print(sin(time));
  Serial.print(",Timestamp:");
  Serial.println(millis());
  delay(10);
  time += 0.05;
  if (time > 6.28){
    time = 0.0;
  }
}
